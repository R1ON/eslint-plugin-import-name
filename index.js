'use strict';

module.exports = {
  rules: {
    'default-import-name': require('./libs/rules/default-import-name'),
    'common-import-name': require('./libs/rules/common-import-name'),
    'all-imports-name': require('./libs/rules/all-imports-name'),
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
