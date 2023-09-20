# better-sqlite3-default-extensions-helper
This library allows you to load default extension by default for better-sqlite3

## How to use

Simply put the extensions you want to use in:
- a folder called `better-sqlite3-extensions` in the root of your project
- a folder that you specify in an **environment variable** named `DEFAULT_SQLITE_EXTENSIONS_PATH`

```js
const helper = require('better-sqlite3-extensions-helper');
const Database = require('better-sqlite3');

const DatabaseWithHelper = helper(Database); 
// you can use DatabaseWithHelper the same way you would use better-sqlite3 but the default extensions will be loaded automaticly
```

## Installation
`npm install better-sqlite3-default-extensions-helper`

Make sure you have https://www.npmjs.com/package/better-sqlite3 installed, otherwise this wouldn't work.