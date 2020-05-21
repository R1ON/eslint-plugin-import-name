#How to use:

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
    ]
}
```

##Rules:

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

- **common-import-name** - in process..
