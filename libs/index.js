'use strict';

module.exports = {
  rules: {
    'default-import-name': require('./rules/default-import-name'),
    'common-import-name': require('./rules/common-import-name'),
    'all-imports-name': require('./rules/all-imports-name'),
  },
  configs: {
    recommended: {
      plugins: ['import-name'],
      rules: {
        'import-name/default-import-name': ['error', { classnames: 'classNames' }],
      },
    },
  },
};
