# eslint-plugin-import-name
[![npm](https://img.shields.io/npm/v/eslint-plugin-import-name.svg)](https://www.npmjs.com/package/eslint-plugin-import-name)
[![NPM total downloads](https://img.shields.io/npm/dt/eslint-plugin-import-name.svg?style=flat)](https://npmjs.org/package/eslint-plugin-import-name)

Eslint plugin to restrict import name. Works with default and CommonJS imports.

## Installation
```
yarn add -D eslint-plugin-import-name

or

npm install -D eslint-plugin-import-name
```

## How to use:
Add to your `.eslintrc`:
```
"extends": [
    "plugin:import-name/recommended"
]
```
This will add the correct name for the package `classnames`.
Or create your own rule for your imports:
```
"plugins": ["import-name"],
"rules": {
    "import-name/default-import-name": [
        'error',
        { classnames: 'classNames', 'prop-types': 'PropTypes' }
    ],
    "import-name/common-import-name": [
        'warning',
        { 'cookie-parser': 'cookieParser' }
    ],
}
```

## Rules:

- **all-imports-name** - combines the two previous rules together.
```
'import-name/all-imports-name': [
    'error',
    { classnames: 'classNames', 'prop-types': 'PropTypes' }
],
```

- **default-import-name** - allows you to create a constant name for default import.
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

- **common-import-name** - allows you to create a constant name for CommonJS import.
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
