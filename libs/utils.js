const meta = (urlLink) => ({
  type: 'problem',
  docs: {
    description: 'disallow invalid import name',
    category: 'Coding Conventions',
    recommended: true,
    url: `https://github.com/R1ON/eslint-plugin-import-name/blob/master${urlLink}`,
  },
  schema: [
    {
      type: 'object',
      minProperties: 1,
      additionalProperties: true,
    },
  ],
  fixable: 'code',
});

function parseOptions(context) {
  const options = new Map();

  if (context.options.length > 0) {
    const imports = context.options[0];
    const importsKeys = Object.keys(imports);

    if (importsKeys.length > 0) {
      Object.keys(imports).forEach((importKey) => {
        options.set(importKey, imports[importKey]);
      });
    }
  }

  return options;
}

function createMessage(currentImportName, correctImportName, packageName) {
  if (!packageName) {
    return `Rename "${currentImportName}" to "${correctImportName}".`;
  }

  return `Importing "${packageName}" as "${currentImportName}" is not allowed, use "${correctImportName}" instead.`;
}

function importDeclaration(context, node, importNames, options) {
  const newImportNames = new Map(importNames);

  if (
    node.source
    && node.source.value
    && node.specifiers
  ) {
    const correctImportName = options.get(node.source.value);

    if (correctImportName) {
      for (const specifier of node.specifiers) {
        if (
          specifier.type === 'ImportDefaultSpecifier'
          && specifier.local
          && specifier.local.name
          && specifier.local.name !== correctImportName
        ) {
          const currentImportName = specifier.local.name;
          const packageName = node.source.value;

          newImportNames.set(currentImportName, packageName);

          context.report({
            loc: specifier.loc,
            message: createMessage(
              currentImportName,
              correctImportName,
              packageName,
            ),
            fix: (fixer) => fixer.replaceText(specifier, correctImportName),
          });
        }
      }
    }
  }

  return newImportNames;
}

function variableDeclaration(context, node, importNames, options) {
  const newImportNames = new Map(importNames);

  if (node.declarations) {
    for (const declaration of node.declarations) {
      if (declaration.init && declaration.id) {
        const init = declaration.init;
        const currentImportName = declaration.id.name;

        if (
          init
          && init.callee
          && init.callee.name === 'require'
          && init.type === 'CallExpression'
          && currentImportName
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
    }
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
  meta,
  parseOptions,
  importDeclaration,
  variableDeclaration,
  callExpression,
};
