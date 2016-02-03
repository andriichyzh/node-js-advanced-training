# Modules and NPM

## Main problems in JavaScript:

  - Absence of namespacing
  - Polluting of global scope 

## Module pattern

```js
let module = (function() {
    let privateData = { user: 'ABC' };

    let exports = {
        publicFunc: function() {
            return privateData;
        }
    };

    return exports;
})();

console.log(module); // { publicFunc: [Function] }
console.log(module.privateData); // undefined
console.log(module.publicFunc()); // { user: 'ABC' }
```

## Node.js modules

 - In base CommonJS modules
 - Each module runs in a private scope
 - Variables that are defined locally does not pollute the global namespace
 
## Example of Node.js modules loader (note: using `eval()` is anti-pattern!)

```js
const fs = require('fs');

function loadModule(filename, module, require) {
    const moduleContent = fs.readFileSync(filename, 'utf8');
    const moduleSrc =
        '(function(module, exports, require) {' +
        moduleContent +
        '})(module, module.exports, require);';

    eval(moduleSrc);
}
```

## Simplified implementation of `require()` ([original code](https://github.com/nodejs/node/blob/master/lib/module.js))

```js
let require = function(moduleName) {
    console.log('Require invoked for module: ' + moduleName);
  
    let id = require.resolve(moduleName);
    if (require.cache[id]) {
        return require.cache[id].exports;
    }
 
    // Module metadata
    let module = {
        exports: {},
        id: id
    };
  
    // Update the cache
    require.cache[id] = module;

    // Load the module
    loadModule(id, module, require);
  
    // Return exported variables
    return module.exports;
};

require.cache = {};

require.resolve = function(moduleName) {
    /* resolve a full module id from the moduleName */
};
```

## Defining `global` variables

```js
// Module 1
global.cache = 'test';
```

```js
// Module 2
console.log(global.cache); // 'test'
console.log(cache); // test
```

## Difference `module.exports` vs `exports`

**The variable `exports` is just a reference to the initial value of `module.exports`.**

### We can only attach new properties to the object `exports`

```js
// Module `time.js`
exports.getTime = function() {
    console.log(Date.now());
};
```

```js
const time = require('./time.js');

console.log(time); // { getTime: [Function] }
console.log(time.getTime()); // 1454370964267
```

### Reassigning the `exports` variable doesn't have any effect, because it doesn't change the contents of `module.exports`

#### Function

```js
// Module `time.js`
exports = function() {
    console.log(Date.now());
};
```

```js
const time = require('./time.js');

console.log(time); // {}
console.log(time()); // TypeError: time is not a function
```

#### String

```js
// Module `env.js`
exports = process.env.NODE_ENV || 'test';
```

```js
const env = require('./env.js');

console.log(env); // {}
```

### Export something other than an object literal (eg function, string, array)

#### Function

```js
// Module `time.js`
module.exports = function() {
    console.log(Date.now());
};
```

```js
const time = require('./time.js');

console.log(time); // [Function]
console.log(time()); // 1454370964267
```

#### String

```js
// Module `env.js`
module.exports = process.env.NODE_ENV || 'test';
```

```js
const env = require('./env.js');

console.log(env); // 'test'
```

## Function `require` is synchronous

```js
const http = require('http');

const port = 3000;

var server = http.createServer((req, res) => {
    let data = require(req.params.id + '.json');

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello! I am Node.js server!' + data.title);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
```

## The resolving algorithm ([source](https://nodejs.org/docs/latest/api/modules.html#modules_all_together))

```
require(X) from module at path Y

1. If X is a core module,
   a. return the core module
   b. STOP
2. If X begins with './' or '/' or '../'
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
3. LOAD_NODE_MODULES(X, dirname(Y))
4. THROW "not found"

LOAD_AS_FILE(X)
1. If X is a file, load X as JavaScript text.  STOP
2. If X.js is a file, load X.js as JavaScript text.  STOP
3. If X.json is a file, parse X.json to a JavaScript Object.  STOP
4. If X.node is a file, load X.node as binary addon.  STOP

LOAD_AS_DIRECTORY(X)
1. If X/package.json is a file,
   a. Parse X/package.json, and look for "main" field.
   b. let M = X + (json main field)
   c. LOAD_AS_FILE(M)
2. If X/index.js is a file, load X/index.js as JavaScript text.  STOP
3. If X/index.json is a file, parse X/index.json to a JavaScript object. STOP
4. If X/index.node is a file, load X/index.node as binary addon.  STOP

LOAD_NODE_MODULES(X, START)
1. let DIRS=NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. LOAD_AS_FILE(DIR/X)
   b. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = []
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   c. DIR = path join(PARTS[0 .. I] + "node_modules")
   b. DIRS = DIRS + DIR
   c. let I = I - 1
5. return DIRS
```

## Cycles

```js
// a.js
console.log('a starting');
exports.done = false;

const b = require('./b.js');

console.log('in a, b.done = %j', b.done);

exports.done = true;
console.log('a done');
```

```js
// b.js
console.log('b starting');
exports.done = false;

const a = require('./a.js');

console.log('in b, a.done = %j', a.done);

exports.done = true;
console.log('b done');
```

```js
// test.js
console.log('main starting');
const a = require('./a.js');
const b = require('./b.js');
console.log('in main, a.done=%j, b.done=%j', a.done, b.done);
```

```bash
$ node main.js
main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a.done=true, b.done=true
```

## The module cache

```js
console.log(require.cache);
```

```js
{ '/home/achyzh/Projects/node-js-advanced-training/examples/test.js': 
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/home/achyzh/Projects/node-js-advanced-training/examples/test.js',
     loaded: false,
     children: [],
     paths: 
      [ '/home/achyzh/Projects/node-js-advanced-training/examples/node_modules',
        '/home/achyzh/Projects/node-js-advanced-training/node_modules',
        '/home/achyzh/Projects/node_modules',
        '/home/achyzh/node_modules',
        '/home/node_modules',
        '/node_modules' 
      ] 
   } 
}
```

## Module definition patterns

### Named exports

```js
// Module logger.js
function getDate() {
    return new Date().toISOString();
}

exports.info = function(message) {
  console.log(getDate(), '[info]', message);
};

exports.error = function(message) {
  console.log(getDate(), '[error]', message);
};
```

```js
// Module app.js
const logger = require('./logger');

logger.info('App started'); // 2016-02-02T00:42:19.664Z [info] App started
logger.error('Critical error!'); // 2016-02-02T00:42:19.667Z [error] Critical error!
```

### Exporting a function

```js
// Module logger.js
function getDate() {
    return new Date().toISOString();
}

module.exports = function(level, message) {
  console.log(getDate(), '[' + level + ']', message);
};
```

```js
// Module app.js
const logger = require('./logger');

logger('info', 'App started'); // 2016-02-02T00:42:19.664Z [info] App started
logger('error', 'Critical error!'); // 2016-02-02T00:42:19.667Z [error] Critical error!
```

#### Expose other functionality for secondary or more advanced use cases

```js
// Module logger.js
function getDate() {
    return new Date().toISOString();
}

// Bad. Only after `module.exports`
// module.exports.getDate = getDate;

module.exports = function(level, message) {
  console.log(getDate(), '[' + level + ']', message);
};

module.exports.level = 'info';
module.exports.getDate = getDate;
```

```js
// Module app.js
const logger = require('./logger');

logger('info', 'App started'); // 2016-02-02T00:42:19.664Z [info] App started
logger('error', 'Critical error!'); // 2016-02-02T00:42:19.667Z [error] Critical error!

logger.level // 'info'
logger.getDate(); // 2016-02-02T00:42:19.669Z

console.log(typeof logger); // 'function'
console.log(typeof logger.level); // 'string'
console.log(typeof logger.getDate); // 'function'
```

### Exporting a constructor

```js
// Module logger.js

function Logger(component) {
    this._component = component;
}

Logger.prototype._getDate = function() {
    return new Date().toISOString();
};

Logger.prototype._log = function(level, message) {
    console.log(this._getDate(), this._component, '[' + level + ']', message);
};

Logger.prototype.info = function(message) {
    this._log('info', message);
};

Logger.prototype.error = function(message) {
    this._log('error', message);
};

module.exports = Logger;
```

```js
// Module app.js
const Logger = require('./logger');

const loggerApi = new Logger('service-api');

loggerApi.info('App started'); // 2016-02-02T00:42:19.664Z service-api [info] App started
loggerApi.error('Critical error!'); // 2016-02-02T00:42:19.667Z service-api [error] Critical error!

const loggerDb = new Logger('service-db');

loggerDb.info('DB connected'); // 2016-02-02T00:42:19.664Z service-db [info] DB connected
loggerDb.error('Critical error!'); // 2016-02-02T00:42:19.667Z service-db [error] Critical error!
```

### Exporting an instance

```js
// Module logger.js
function Logger(component) {
    this._component = component;
}

Logger.prototype._getDate = function() {
    return new Date().toISOString();
};

Logger.prototype._log = function(level, message) {
    console.log(this._getDate(), this._component, '[' + level + ']', message);
};

Logger.prototype.info = function(message) {
    this._log('info', message);
};

Logger.prototype.error = function(message) {
    this._log('error', message);
};

module.exports = new Logger('common');
```

```js
// Module app.js
const logger = require('./logger');

logger.info('App started'); // 2016-02-02T00:42:19.664Z common [info] App started
logger.error('Critical error!'); // 2016-02-02T00:42:19.667Z common [error] Critical error!
```

#### Add exporting constructor

```js
// Module logger.js
function Logger(component) {
    this._component = component;
}

Logger.prototype._getDate = function() {
    return new Date().toISOString();
};

Logger.prototype._log = function(level, message) {
    console.log(this._getDate(), this._component, '[' + level + ']', message);
};

Logger.prototype.info = function(message) {
    this._log('info', message);
};

Logger.prototype.error = function(message) {
    this._log('error', message);
};

module.exports = new Logger('common');

module.exports.Logger = Logger;
```

```js
// Module app.js
const logger = require('./logger');

logger.info('App started'); // 2016-02-02T00:42:19.664Z common [info] App started
logger.error('Critical error!'); // 2016-02-02T00:42:19.667Z common [error] Critical error!

const loggerDb = new logger.Logger('db');

loggerDb.info('DB started'); // 2016-02-02T00:42:23.664Z db [info] DB started
```

## Modifying other modules or the global scope (note: anti-pattern - monkey patching)

```js
// Module patcher.js

require('./logger').trace = function() {
  console.log('This is trace');
};
```

```js
// Module app.js

require('./patcher');

const logger = require('./logger');

logger.trace(); // 'This is trace'
```

## NPM

 - **Link:** https://www.npmjs.com/

 - **Documentation:** https://docs.npmjs.com/

### Installing packages locally

```bash
 npm install <package_name>
```

**Example:**

```bash
npm install lodash
```

```bash
lodash@4.2.1 node_modules/lodash
```

**Check node_modules:**

```bash
ls -l node_modules 
```

```bash
drwxrwxr-x 3 achyzh achyzh 20480 Feb  3 22:29 lodash
```

### Using a `package.json`

**Example:**

```json
{
  "name": "some-package",
  "version": "1.0.0"
}
```

### Creating a `package.json` (interactive mode)

```bash
npm init
```

### Creating a `package.json` (with defaults)

```bash
npm init --yes
```

```json
Wrote to /home/achyzh/Projects/node-js-advanced-training/package.json:

{
  "name": "node-js-advanced-training",
  "version": "1.0.0",
  "description": "![Node.js](static/images/logo.png)",
  "main": "index.js",
  "directories": {
    "example": "examples"
  },
  "dependencies": {
    "lodash": "^4.2.1"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/andriichyzh/node-js-advanced-training.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/andriichyzh/node-js-advanced-training/issues"
  },
  "homepage": "https://github.com/andriichyzh/node-js-advanced-training#readme"
}
```

### Config options

```bash
> npm set init.author.email "andrii.chyzh@npmjs.com"
> npm set init.author.name "andrii.chyzh"
> npm set init.license "MIT"
```

### Specifying Packages

 - **"dependencies"**: these packages are `required by your application in production`
 - **"devDependencies"**: these packages are `only` needed for `development and testing`

### Install packages with flags

 - To add an entry to your `package.json`'s `dependencies`:
 
    ```bash
    npm install <package_name> --save
    ```

 - To add an entry to your `package.json`'s `devDependencies`:
 
    ```bash
    npm install <package_name> --save-dev
    ```
   
### Semver for consumers

If you were starting with a package `1.0.4`, this is how you would specify the ranges:

 - `Patch` releases: `1.0` or `1.0.x` or `~1.0.4`
 - `Minor` releases: `1` or `1.x` or `^1.0.4`
 - `Major` releases: `*` or `x`

More details: https://docs.npmjs.com/misc/semver

### Local packages

#### Updating local packages

```bash
npm update
```

#### Check outdated packages

```bash
npm outdated
```

**Output:**

```bash
Package               Current  Wanted  Latest  Location
lodash                 3.10.1  3.10.1   4.2.1  lodash
mongoose               3.8.39  3.8.39   4.4.0  mongoose
retry                   0.6.1   0.6.1   0.9.0  retry
should                  6.0.3   6.0.3   8.2.1  should
```

#### Uninstalling local packages

```bash
npm uninstall lodash
```

**With deleting from `package.json`:**

```bash
npm uninstall --save lodash
```


### Global packages

#### Installing npm packages globally

```bash
npm install -g gulp
```

#### Updating global packages

```bash
npm update -g gulp
```

```bash
npm update -g
```

#### Uninstalling global packages

```bash
npm uninstall -g gulp
```

### Cli commands

Link: https://docs.npmjs.com/cli/cache
