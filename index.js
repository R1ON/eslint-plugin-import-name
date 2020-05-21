'use strict';

module.exports = {
  rules: {
    'default-import-name': {
      meta: {
        type: 'problem',
        docs: {
          description: 'disallow invalid import name',
          category: 'Coding Conventions',
          recommended: true,
        },
        schema: [
          {
            type: 'object',
            minProperties: 1,
            additionalProperties: true,
          },
        ],
        fixable: 'code',
      },
      create: (context) => {
        const importNames = new Map();
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

        return {
          ImportDeclaration: (node) => {
            if (node.source && node.source.value) {
              const correctImportName = options.get(node.source.value);

              correctImportName && node.specifiers && node.specifiers.forEach((specifier) => {
                if (
                  specifier.type === 'ImportDefaultSpecifier'
                  && specifier.local
                  && specifier.local.name
                  && specifier.local.name !== correctImportName
                ) {
                  importNames.set(specifier.local.name, node.source.value);

                  context.report({
                    loc: specifier.loc,
                    message: `Importing "${node.source.value}" as "${specifier.local.name}" is not allowed, use "${correctImportName}" instead.`,
                    fix: (fixer) => fixer.replaceText(specifier, correctImportName),
                  });
                }
              });
            }
          },

          CallExpression: (node) => {
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
                    message: `Rename "${node.callee.name}" to "${correctImportName}".`,
                    fix: (fixer) => fixer.replaceTextRange(node.callee.range, correctImportName),
                  });
                }
              }
            }
          }
        };
      },
    },
  },
  configs: {
    recommended: {
      plugins: ['import-name'],
      rules: { 'import-name/default-import-name': ['error', { classnames: 'classNames' }] },
    },
  },
};
