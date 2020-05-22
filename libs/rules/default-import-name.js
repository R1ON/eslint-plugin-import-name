'use strict';

const {
  meta,
  parseOptions,
  importDeclaration,
  callExpression,
} = require('../utils');

module.exports = {
  meta: meta('/docs/default-import-name.md'),
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
};
