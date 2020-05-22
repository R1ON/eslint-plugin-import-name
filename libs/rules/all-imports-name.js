'use strict';

const { meta, parseOptions, variableDeclaration, callExpression } = require('../utils');

module.exports = {
  meta: meta('/docs/common-import-name.md'),
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
};
