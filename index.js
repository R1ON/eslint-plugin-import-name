'use strict';

const { meta, parseOptions, createMessage } = require('./utils');

function importDeclaration(context, node, importNames, options) {
  const newImportNames = new Map(importNames);

  if (node.source && node.source.value) {
    const correctImportName = options.get(node.source.value);

    correctImportName && node.specifiers && node.specifiers.forEach((specifier) => {
      if (
        specifier.type === 'ImportDefaultSpecifier'
        && specifier.local
        && specifier.local.name
        && specifier.local.name !== correctImportName
      ) {
        newImportNames.set(specifier.local.name, node.source.value);

        context.report({
          loc: specifier.loc,
          message: createMessage(
            specifier.local.name,
            correctImportName,
            node.source.value,
          ),
          fix: (fixer) => fixer.replaceText(specifier, correctImportName),
        });
      }
    });
  }

  return newImportNames;
}

function variableDeclaration(context, node, importNames, options) {
  const newImportNames = new Map(importNames);

  if (node.declarations) {
    node.declarations.forEach((declaration) => {
      if (declaration && declaration.init && declaration.id) {
        const init = declaration.init;
        const currentImportName = declaration.id.name;

        if (
          init
          && init.type === 'CallExpression'
          && init.callee
          && init.callee.name
          && init.callee.name === 'require'
        ) {
          const packageName = init.arguments[0].value;

          const correctImportName = options.get(packageName);

          if (correctImportName && currentImportName !== correctImportName) {
            const range = declaration.id.range;

            newImportNames.set(currentImportName, packageName);

            context.report({
              loc: declaration.loc,
              message: createMessage(currentImportName, correctImportName, packageName),
              fix: (fixer) => fixer.replaceTextRange(range, correctImportName),
            });
          }
        }
      }
    });
  }

  return newImportNames;
}

function callExpression(context, node, importNames, options) {
  if (
    node.callee
    && node.callee.name
    && importNames.size > 0
  ) {
    const packageName = importNames.get(node.callee.name);

    if (packageName) {
      const correctImportName = options.get(packageName);

      if (correctImportName) {
        context.report({
          loc: node.callee.loc,
          message: createMessage(node.callee.name, correctImportName),
          fix: (fixer) => fixer.replaceTextRange(node.callee.range, correctImportName),
        });
      }
    }
  }
}

module.exports = {
  rules: {
    'default-import-name': {
      meta,
      create: (context) => {
        let importNames = new Map();
        const options = parseOptions(context);

        return {
          ImportDeclaration: (node) => {
            importNames = importDeclaration(context, node, importNames, options);
          },

          CallExpression: (node) => {
            callExpression(context, node, importNames, options);
          }
        };
      },
    },
    'common-import-name': {
      meta,
      create: (context) => {
        let importNames = new Map();
        const options = parseOptions(context);

        return {
          VariableDeclaration: (node) => {
            importNames = variableDeclaration(context, node, importNames, options);
          },

          CallExpression: (node) => {
            callExpression(context, node, importNames, options);
          }
        };
      }
    },
    'all-imports-name': {
      meta,
      create: (context) => {
        let importNames = new Map();
        const options = parseOptions(context);

        return {
          ImportDeclaration: (node) => {
            importNames = importDeclaration(context, node, importNames, options);
          },

          VariableDeclaration: (node) => {
            importNames = variableDeclaration(context, node, importNames, options);
          },

          CallExpression: (node) => {
            callExpression(context, node, importNames, options);
          }
        };
      }
    },
  },
  configs: {
    recommended: {
      plugins: ['custom-rules'],
      rules: {
        'custom-rules/all-imports-name': ['error', { classnames: 'classNames' }],
      },
    },
  },
};
