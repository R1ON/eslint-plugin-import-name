const meta = {
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
};

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

module.exports = {
  meta,
  parseOptions,
  createMessage,
};
