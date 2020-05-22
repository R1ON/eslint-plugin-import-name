'use strict';

const {
  meta,
  parseOptions,
  importDeclaration,
  variableDeclaration,
  callExpression,
} = require('../utils');

module.exports = {
  meta: meta('/docs/all-imports-name.md'),
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
};
