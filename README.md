# eslint-plugin-import-name
[![npm](https://img.shields.io/npm/v/eslint-plugin-import-name.svg)](https://www.npmjs.com/package/eslint-plugin-import-name)

Eslint plugin to restrict import name. Works with default and CommonJS imports.

## Install
yarn
```
yarn add eslint-plugin-import-name --dev
```

npm
```
npm install eslint-plugin-import-name --dev
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
import propTypes from 'prop-types';

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
const propTypes = require('prop-types');

Good: ✅
const classNames = require('classnames');
const PropTypes = require('prop-types');
```
