# eslint-plugin-import-name
[![npm](https://img.shields.io/npm/v/eslint-plugin-import-name.svg)](https://www.npmjs.com/package/eslint-plugin-import-name)

Eslint plugin to restrict import name. Works with default and CommonJS imports.
[Link to all the rules.](https://github.com/R1ON/eslint-plugin-import-name)

### all-imports-name
Combines two rules together (
[default-import-name](https://github.com/R1ON/eslint-plugin-import-name/blob/master/docs/default-import-name.md),
[common-import-name](https://github.com/R1ON/eslint-plugin-import-name/blob/master/docs/common-import-name.md)
).

```
'import-name/all-imports-name': [
    'error',
    { classnames: 'classNames', 'prop-types': 'PropTypes' }
],

Bad: ❌
import cx from 'classnames';
const proptypes = require('prop-types');

Good: ✅
import classNames from 'classnames';
const PropTypes = require('prop-types');
```