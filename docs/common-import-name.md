# eslint-plugin-import-name
[![npm](https://img.shields.io/npm/v/eslint-plugin-import-name.svg)](https://www.npmjs.com/package/eslint-plugin-import-name)

Eslint plugin to restrict import name. Works with default and CommonJS imports.
[Link to all the rules.](https://github.com/R1ON/eslint-plugin-import-name)

### common-import-name
Allows you to create a constant name for CommonJS import.
```
'import-name/common-import-name': [
    'error',
    { classnames: 'classNames', 'prop-types': 'PropTypes' }
]

Bad: ❌
const cx = require('classnames');
const proptypes = require('prop-types');

Good: ✅
const classNames = require('classnames');
const PropTypes = require('prop-types');
```