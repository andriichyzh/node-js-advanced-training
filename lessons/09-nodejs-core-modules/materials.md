# Core Modules

## [Console](https://nodejs.org/dist/latest-v4.x/docs/api/console.html)

The `console` module provides a simple debugging console 

**Exports two specific components:**

 - A `Console` class with methods:
    - console.log()
    - console.error()
    - console.warn()
 - A global `console` instance write to `stdout` and `stderr`. 
 - Can be used without calling `require('console')`.

### Global `console`:

```js
console.log('Hello, User A!');
// 'Hello, User A!' (to stdout)

console.log('Connected!', 'I am Robot!');
// 'Connected! I am Robot!' (to stdout)

customConsole.info('Hello, User B!');
// 'Hello, User B!' (to stdout)

console.error(new Error('Critical error!'));
// [Error: Critical error!] (to stderr)

console.warn('Validation failed!');
// 'Validation failed!' (to stderr)
```

### Class `Console`

```js
const Console = require('console').Console;
const Console = console.Console;
```

```js
const out = getOutStream(); // writable out
const err = getErrStream(); // writable err

const customConsole = new console.Console(out, err);

customConsole.log('Hello, User A!');
// 'Hello, User A!' (to out)

customConsole.info('Hello, User B!');
// 'Hello, User B!' (to out)

customConsole.error(new Error('Critical error!'));
// [Error: Critical error!] (to err)

customConsole.warn('Validation failed!');
// 'Validation failed!' (to err)
```

### Function `console.error()`

Prints to `stderr` with newline. `Multiple arguments` can be passed, with the first used as the primary message.

Alias: `console.warn()`

```js
console.error([data][, ...])
```


### Function `console.log()`

Prints to `stdout` with newline. `Multiple arguments` can be passed, with the first used as the primary message.

Alias: `console.info()`

```js
console.log([data][, ...])
```


### Function `console.assert()`

A simple assertion test that verifies whether value is `truthy`.

```js
console.assert(value[, message][, ...])
```

Example:

```js
console.assert(true, 'Connection failed!');

console.assert(false, 'Parameter `port` is required!');
// AssertionError: Parameter `port` is required!
```


### Function `console.dir()`

```js
console.dir(obj[, options])
```

Options:

 - `showHidden` - if `true` then the object's non-enumerable and symbol properties will be shown too. Defaults to `false`.
 - `depth` - tells inspect how many times to recurse while formatting the object. This is useful for inspecting large complicated objects. Defaults to `2`. To make it recurse indefinitely, pass null.
 - `colors` - if `true`, then the output will be styled with `ANSI` color codes. Defaults to `false`. 

Example:

```js
console.dir(/node/, { showHidden: true });
```

```bash
{ /node/
  [source]: 'node',
  [global]: false,
  [ignoreCase]: false,
  [multiline]: false,
  [lastIndex]: 0 }
```

### Functions `console.time()` and `console.timeEnd()`

Used to calculate the duration of a specific operation. 

```js
let fib = function fib(n){
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
};

console.time('fib');
fib(30);
console.timeEnd('fib');

// fib: 18ms
```

### Function `console.trace()`

Prints to stderr the formatted message and stack trace to the current position in the code. 

```js
console.trace('Control point');
```

```bash
Trace: Control point
    at Object.<anonymous> (/home/achyzh/Projects/node-js-advanced-training/examples/test.js:3:9)
    at Module._compile (module.js:410:26)
    at Object.Module._extensions..js (module.js:417:10)
    at Module.load (module.js:344:32)
    at Function.Module._load (module.js:301:12)
    at Function.Module.runMain (module.js:442:10)
    at startup (node.js:136:18)
    at node.js:966:3
```

### Examples

#### Logger to files

```js
const Console = require('console').Console;
const fs = require('fs');

const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');

const logger = new Console(output, errorOutput);

logger.info('New request', { params: { id: '12345' } });
```

File `stdout.log`
```bash
New request { params: { id: '12345' } }
```

#### Logger to `stdout` and `stderr` with formatting

```js
const Console = require('console').Console;

const transformer = loggerFormatter(process.stdout, process.stderr);

const logger = new Console(transformer);

logger.info('New request', { params: { id: '12345' } });

// 'New request { params: { id: '12345' } }' (original)
// '2016-02-03T23:27:26.719Z [INFO] New request { params: { id: '12345' } }' (formatted)
```


## [Process](https://nodejs.org/dist/latest-v4.x/docs/api/process.html)

### process.cwd()
   
Returns the current working directory of the process.

```js
console.log('Current directory:', process.cwd()); // Current directory: /home/achyzh/Projects/node-js-advanced-training
```

### process.chdir(directory)

```js
console.log('Current directory:', process.cwd()); // Current directory: /home/achyzh/Projects/node-js-advanced-training

process.chdir('/tmp');

console.log('Current directory:', process.cwd()); // Current directory: /tmp
```

### process.env

An object containing the user environment

#### Get

```js
console.log(process.env);
```

```js
{ 
  TERM: 'xterm-256color',
  PAPERSIZE: 'letter',
  XDG_SESSION_PATH: '/org/freedesktop/DisplayManager/Session0',
  UPSTART_SESSION: 'unix:abstract=/com/ubuntu/upstart-session/1000/2919',
  ...
  DESKTOP_SESSION: 'ubuntu',
  DISPLAY: ':0',
  LC_MONETARY: 'en_US.UTF-8',
  USER: 'achyzh',
  HOME: '/home/achyzh',
}
```

#### Set

```js
process.env.NODE_ENV = 'test';
console.log(process.env.NODE_ENV); // 'test'
```

### process.argv

An array containing the command line arguments. 
The first element will be 'node', the second element will be the name of the JavaScript file. 
The next elements will be any additional command line arguments.
 
Create file `test.js`:

```js
console.log(process.argv);
// [ '/home/achyzh/.nvm/versions/node/v4.2.6/bin/node', '/home/achyzh/Projects/node-js-advanced-training/examples/test.js', '--test' ]
```

Run:

```bash
node examples/test.js --test
```

Output:

```js
[ '/home/achyzh/.nvm/versions/node/v4.2.6/bin/node', 
  '/home/achyzh/Projects/node-js-advanced-training/examples/test.js', 
  '--test' ]
```

## Stream

Link: https://itarchitectblog.wordpress.com/2014/11/18/node-js-streams/