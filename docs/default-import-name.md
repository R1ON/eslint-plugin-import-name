# eslint-plugin-import-name
[![npm](https://img.shields.io/npm/v/eslint-plugin-import-name.svg)](https://www.npmjs.com/package/eslint-plugin-import-name)

Eslint plugin to restrict import name. Works with default and CommonJS imports.
[Link to all the rules.](https://github.com/R1ON/eslint-plugin-import-name)

### default-import-name
Allows you to create a constant name for default import.
```
'import-name/default-import-name': [
    'error',
    { classnames: 'classNames', 'prop-types': 'PropTypes' }
]

Bad: ❌
import cx from 'classnames';
import proptypes from 'prop-types';

Good: ✅
import classNames from 'classnames';
import PropTypes from 'prop-types';
 ```