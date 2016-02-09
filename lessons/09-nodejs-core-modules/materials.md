# Core Modules

## [Globals](https://nodejs.org/dist/latest-v4.x/docs/api/globals.html)

### `Class: Buffer`

Used to handle binary data.

### `__dirname`

The name of the directory that the currently executing script resides in. 

### `__filename`

The filename of the code being executed. This is the resolved absolute path of this code file. 

### `console`

Used to print to `stdout` and `stderr`.

### `exports`

A reference to the module.exports that is shorter to type. 

### `global`

The global namespace object.

### `module`

A reference to the current module. In particular module.exports is used for defining what a module exports and makes available through require(). 

### `process`

The process object.

### `require()`

To require modules.

### `setInterval(cb, ms)`

Run callback cb repeatedly every ms milliseconds. 
Note that the actual interval may vary, depending on external factors like OS timer granularity and system load. 
It's never less than ms but it may be longer. 

### `setTimeout(cb, ms)`

Run callback cb after at least ms milliseconds. 
The actual delay depends on external factors like OS timer granularity and system load. 

### `clearInterval(t)`
### `clearTimeout(t)`


## [Assertion Testing](https://nodejs.org/dist/latest-v4.x/docs/api/assert.html)

The `assert` module provides a simple set of assertion tests that can be used to test invariants. 
The module is intended for internal use by Node.js, but can be used in application code via `require('assert')`. 
However, `assert is not a testing framework`, and is `not intended to be used as a general purpose assertion library`. 

## `assert(value[, message]), assert.ok(value[, message])`
## `assert.deepEqual(actual, expected[, message])`
## `assert.deepStrictEqual(actual, expected[, message])`
## `assert.doesNotThrow(block[, error][, message])`
## `assert.equal(actual, expected[, message])`
## `assert.fail(actual, expected, message, operator)`
## `assert.ifError(value)`
## `assert.notDeepEqual(actual, expected[, message])`
## `assert.notDeepStrictEqual(actual, expected[, message])`
## `assert.notEqual(actual, expected[, message])`
## `assert.notStrictEqual(actual, expected[, message])`
## `assert.strictEqual(actual, expected[, message])`
## `assert.throws(block[, error][, message])`


## [Console](https://nodejs.org/dist/latest-v4.x/docs/api/console.html)

The `console` module provides a simple debugging console 

**Exports two specific components:**

 - A `Console` class with methods:
    - `console.log()`
    - `console.info()`
    - `console.error()`
    - `console.warn()`
 - A global `console` instance write to `stdout` and `stderr`. Can be used without calling `require('console')`.

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
const customConsole = new console.Console(process.stdout, process.stderr);

customConsole.log('Hello, User A!');
// 'Hello, User A!' (to out)

customConsole.info('Hello, User B!');
// 'Hello, User B!' (to out)

customConsole.error(new Error('Critical error!'));
// [Error: Critical error!] (to err)

customConsole.warn('Validation failed!');
// 'Validation failed!' (to err)
```

### `console.error()`

Prints to `stderr` with newline. `Multiple arguments` can be passed, with the first used as the primary message.

Alias: `console.warn()`

```js
console.error([data][, ...])
```


### `console.log()`

Prints to `stdout` with newline. `Multiple arguments` can be passed, with the first used as the primary message.

Alias: `console.info()`

```js
console.log([data][, ...])
```


### `console.assert()`

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


### `console.dir()`

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

### `console.time()` and `console.timeEnd()`

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

### `console.trace()`

Prints to `stderr` the formatted message and stack trace to the current position in the code. 

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

const transformer = loggerFormatter(process.stdout);

const logger = new Console(transformer);

logger.info('New request', { params: { id: '12345' } });

// 'New request { params: { id: '12345' } }' (original)
// '2016-02-03T23:27:26.719Z [INFO] New request { "params": { "id": "12345" } }' (formatted)
```

***


## [Process](https://nodejs.org/dist/latest-v4.x/docs/api/process.html)

### `process.cwd()`
   
Returns the current working directory of the process.

```js
console.log('Current directory:', process.cwd()); // Current directory: /home/achyzh/Projects/node-js-advanced-training
```

### `process.chdir(directory)`

```js
console.log('Current directory:', process.cwd()); // Current directory: /home/achyzh/Projects/node-js-advanced-training

process.chdir('/tmp');

console.log('Current directory:', process.cwd()); // Current directory: /tmp
```

### `process.env`

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

### process.pid

The `PID` of the process.

```js
console.log(process.pid); // 2891
```

### `process.argv`

An array containing the command line arguments. 
The first element will be 'node', the second element will be the name of the JavaScript file. 
The next elements will be any additional command line arguments.
 
Create file `test.js`:

```js
console.log(process.argv);
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

### `process.execArgv`

This is the set of Node.js-specific command line options from the executable that started the process. These options are useful in order to spawn child processes with the same execution environment as the parent.

```bash
$ node --expose-gc script.js --version
```

```js
console.log(process.execArgv); // ['--expose-gc']
console.log(process.argv); // ['/usr/local/bin/node', 'script.js', '--version']
```

### `process.exit([code])`

Ends the process with the specified code. If omitted, exit uses the 'success' code 0.

```js
process.exit(); // success

process.exit(1); // failure
```

### `process.hrtime()`

Returns the current high-resolution real time in a [seconds, nanoseconds] tuple Array. The primary use is for measuring performance between intervals.

You may pass in the result of a previous call to `process.hrtime()` to get a diff reading, useful for benchmarks and measuring intervals:

```js
var time = process.hrtime();
// [ 1800216, 25 ]

setTimeout(() => {
  var diff = process.hrtime(time);
  // [ 1, 552 ]

  console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
  // benchmark took 1000000527 nanoseconds
}, 1000);
```

### `process.memoryUsage()`

Returns an object describing the `memory usage` of the Node.js process measured in bytes.

```js
console.log(process.memoryUsage());
```

Output:

```js
{ rss: 4935680,
  heapTotal: 1826816,
  heapUsed: 650472 }
```

Note: `heapTotal` and `heapUsed` refer to `V8`'s memory usage. 


### `process.nextTick(callback[, arg][, ...])`
    
Once the current event loop turn runs to completion, call the callback function.
    
This is not a simple alias to `setTimeout(fn, 0)`, it's much more efficient. 
**It runs `before any additional I/O events` (including timers) fire in subsequent ticks of the event loop.**
    
```js
console.log('start');
process.nextTick(() => {
  console.log('nextTick callback');
});
console.log('scheduled');
```

Output:

```
// start
// scheduled
// nextTick callback
```
      
This is important in developing APIs where you want to give the user the chance to assign event handlers after an object has been constructed, but before any I/O has occurred.
   
```js
function MyThing(options) {
  this.setupOptions(options);

  process.nextTick(() => {
    this.startDoingStuff();
  }.bind(this));
}

var thing = new MyThing();
thing.getReadyForStuff();

// thing.startDoingStuff() gets called now, not before.
```

It is very important for APIs to be either `100% synchronous` or `100% asynchronous`. 

Consider this example:

```js
// WARNING! DO NOT USE! BAD UNSAFE HAZARD!
function maybeSync(arg, cb) {
    if (arg) {
        return cb();
    }

    fs.stat('file', cb);
}
```    

This API is hazardous. If you do this:

```js
maybeSync(true, function() {
    foo();
});

bar();
```

then it's not clear whether `foo()` or `bar()` will be called first.
    
This approach is much better:
   
```js
function definitelyAsync(arg, cb) {
    if (arg) {
        return process.nextTick(cb);
    }

    fs.stat('file', cb);
}
```
 
Note: The `nextTick` queue is completely drained on each pass of the event loop `before additional I/O is processed`. 
**As a result, `recursively setting nextTick callbacks will block any I/O from happening`, just like a while(true); loop.**


### `process.stdin`

A `Readable Stream` for `stdin` (on fd 0).

### `process.stdout`

A `Writable Stream` to `stdout` (on fd 1). 

### `process.stderr`

A `Writable Stream` to `stderr` (on fd 2).

Notes: `process.stderr` and `process.stdout` are unlike other streams in Node.js in that they `cannot be closed` (end() will throw).
They `never emit the finish event` and that writes `can block when output is redirected to a file` (although disks are fast and operating systems normally employ write-back caching so it should be a very rare occurrence indeed.)


### `Event: 'uncaughtException'`

Emitted when an exception bubbles all the way back to the event loop. 
If a listener is added for this exception, the default action (which is to print a stack trace and exit) will not occur. 

```js
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
});

setTimeout(() => {
  console.log('This will still run.');
}, 500);

// Intentionally cause an exception, but don't catch it.
nonexistentFunc();
console.log('This will not run.');
```

```bash
// Caught exception: ReferenceError: nonexistentFunc is not defined
// This will still run.
```

Note that `uncaughtException` is a very crude mechanism for exception handling. 

`uncaughtException` should be used to perform synchronous cleanup before shutting down the process. 
It is not safe to resume normal operation after 'uncaughtException'. 
If you do use it, restart your application after every unhandled exception! 

#### Exit Codes

Node.js will normally exit with a 0 status code when no more async operations are pending. The following status codes are used in other cases:

 - `1 Uncaught Fatal Exception` - There was an uncaught exception, and it was not handled by a domain or an 'uncaughtException' event handler.
 - `2` - Unused (reserved by Bash for builtin misuse)
 - `3 Internal JavaScript Parse Error` - The JavaScript source code internal in Node.js's bootstrapping process caused a parse error. This is extremely rare, and generally can only happen during development of Node.js itself.
 - `4 Internal JavaScript Evaluation Failure` - The JavaScript source code internal in Node.js's bootstrapping process failed to return a function value when evaluated. This is extremely rare, and generally can only happen during development of Node.js itself.
 - `5 Fatal Error` - There was a fatal unrecoverable error in V8. Typically a message will be printed to stderr with the prefix FATAL ERROR.
 - `6 Non-function Internal Exception Handler` - There was an uncaught exception, but the internal fatal exception handler function was somehow set to a non-function, and could not be called.
 - `7 Internal Exception Handler Run-Time Failure` - There was an uncaught exception, and the internal fatal exception handler function itself threw an error while attempting to handle it. This can happen, for example, if a process.on('uncaughtException') or domain.on('error') handler throws an error.
 - `8` - Unused. In previous versions of Node.js, exit code 8 sometimes indicated an uncaught exception.
 - `9 - Invalid Argument` - Either an unknown option was specified, or an option requiring a value was provided without a value.
 - `10 Internal JavaScript Run-Time Failure` - The JavaScript source code internal in Node.js's bootstrapping process threw an error when the bootstrapping function was called. This is extremely rare, and generally can only happen during development of Node.js itself.
 - `12 Invalid Debug Argument` - The --debug and/or --debug-brk options were set, but an invalid port number was chosen.
 - `>128 Signal Exits` - If Node.js receives a fatal signal such as SIGKILL or SIGHUP, then its exit code will be 128 plus the value of the signal code. This is a standard Unix practice, since exit codes are defined to be 7-bit integers, and signal exits set the high-order bit, and then contain the value of the signal code.
    

## [Timers](https://nodejs.org/dist/latest-v4.x/docs/api/timers.html)

All of the timer functions are `globals`. You do not need to `require()` this module in order to use them. 

### `setTimeout(callback, delay[, arg][, ...])`

To schedule execution of a `one-time callback after delay milliseconds`. 

Returns a `timeoutObject` for possible use with `clearTimeout()`. Optionally you can also pass arguments to the callback.

It is important to `note that your callback will probably not be called in exactly delay milliseconds`.
`Node.js makes no guarantees about the exact timing of when the callback will fire`, nor of the ordering things will fire in. 
`The callback will be called as close as possible to the time specified.`

To follow browser behavior, when using delays larger than `2147483647` milliseconds (approximately 25 days) or less than `1`, the timeout is executed immediately, as if the delay was set to `1`.


### `setInterval(callback, delay[, arg][, ...])`

To schedule the `repeated execution of callback every delay milliseconds`. 

Returns a `intervalObject` for possible use with `clearInterval()`. Optionally you can also pass arguments to the callback.

To follow browser behavior, when using delays larger than `2147483647` milliseconds (approximately 25 days) or less than `1`, Node.js will use `1` as the delay.


### `setImmediate(callback[, arg][, ...])`

To schedule the `"immediate" execution of callback after I/O events callbacks` and `before setTimeout() and setInterval()`. 

Returns an `immediateObject` for possible use with `clearImmediate()`. Optionally you can also pass arguments to the callback.

`Callbacks for immediates are queued in the order in which they were created.` 

The entire callback queue is processed every event loop iteration. 
If you queue an immediate from inside an executing callback, that immediate won't fire until the next event loop iteration.


### `unref()`

The opaque value returned by `setTimeout` and `setInterval` also has the method `timer.unref()` which will allow you to create a timer that is active but if it is the only item left in the event loop, it won't keep the program running. 
If the timer is already `unrefd` calling `unref` again will have no effect.

In the case of `setTimeout` when you `unref` you create a separate timer that will `wakeup the event loop`, creating too many of these may adversely effect event loop performance -- use wisely.

Returns the `timer`. 


### `ref()`

If you had previously `unref()` a timer you can call `ref()` to explicitly request the timer hold the program open. 
If the timer is already `refd` calling `ref` again will have no effect.

Returns the `timer`. 


### `clearImmediate(immediateObject)`

Stops an immediate from triggering.


### `clearInterval(intervalObject)`

Stops an interval from triggering.


### `clearTimeout(timeoutObject)`

Prevents a timeout from triggering.



## `Important!` Difference `setImmediate()` vs `process.nextTick()`

![setImmediate() vs process.nextTick()](../../static/images/event-loop.jpg)


**References:**

 - [Tracking Down Performance Bottlenecks in Node.js with Meteor & StrongLoop](https://strongloop.com/strongblog/node-js-performance-meteor/)

### Execution order

```js
const fs = require('fs');

// I/O operation
fs.stat(__filename, function() {
    console.log('[1] I/O operation');
});

// setTimeout 0
setTimeout(function() {
    console.log('[2] setTimeout 0');
}, 0);

// setTimeout 25
setTimeout(function() {
    console.log('[3] setTimeout 25');
}, 25);

// setImmediate
setImmediate(function() {
    console.log('[4] setImmediate');
});

// process.nextTick
process.nextTick(function() {
    console.log('[5] process.nextTick');
});

console.log('[6] sync operation');
```

Output:

```bash
[6] sync operation
[5] process.nextTick
[2] setTimeout 0
[1] I/O operation
[4] setImmediate
[3] setTimeout 25
```

### Blocking of event loop

```js
var mode = process.argv[2];

var steps = 0;

console.time('Total time');

function run() {
    steps++;

    for (var i = 0, max = 1e7; i < max; i++) {
        Math.pow(Math.random(), Math.random());
    }

    if (steps === 10) {
        console.timeEnd('Total time');
        return;
    }

    switch(mode) {
        case 'blocked':
            run();
            break;

        case 'nexttick':
            process.nextTick(run);
            break;

        case 'setimmediate':
            setImmediate(run);
            break;

        case 'settimeout':
            setTimeout(run, 10);
            break;
    }
}

function checkIsBlocked() {
    var delay = 10;
    var start = process.hrtime();

    setTimeout(function() {
        var elapsed = process.hrtime(start);
        var time = (elapsed[0] * 1000) + (elapsed[1] / 1e6);

        console.log("I took %s ms! Expected to take %s ms!", time.toFixed(2), delay);
    }, delay);
}


checkIsBlocked();
run();
```

Run:

```bash
node lessons/09-nodejs-core-modules/examples/event-loop/blocks.js

// I took 132.87 ms! Expected to take 10 ms!
```

```bash
node lessons/09-nodejs-core-modules/examples/event-loop/blocks.js nexttick

// Total time: 1263ms
// I took 1263.86 ms! Expected to take 10 ms!
```

```bash
node lessons/09-nodejs-core-modules/examples/event-loop/blocks.js setimmediate                                               

// I took 153.51 ms! Expected to take 10 ms!
// Total time: 1266ms
```

```bash
node lessons/09-nodejs-core-modules/examples/event-loop/blocks.js settimeout  

// I took 132.59 ms! Expected to take 10 ms!
// Total time: 2855ms                                   
```


## [Utils](https://nodejs.org/dist/latest-v4.x/docs/api/util.html)

These functions are in the module 'util'. Use `require('util')` to access them. 

### util.inherits(constructor, superConstructor)

`Inherit the prototype methods from one constructor into another.` The prototype of constructor will be set to a new object created from superConstructor.

Example:

```js
const util = require('util');
const EventEmitter = require('events');

function MyStream() {
    EventEmitter.call(this);
}

util.inherits(MyStream, EventEmitter);

MyStream.prototype.write = function(data) {
    this.emit('data', data);
}


var stream = new MyStream();

console.log(stream instanceof EventEmitter); // true

stream.on('data', (data) => {
    console.log(`Received data: "${data}"`);
});

stream.write('It works!'); // Received data: "It works!"
```

### util.format(format[, ...])
   
Returns a formatted string using the first argument as a printf-like format.
    
The first argument is a string that contains zero or more placeholders. Each placeholder is replaced with the converted value from its corresponding argument. Supported placeholders are:

 -  `%s` - String.
 -  `%d` - Number (both integer and float).
 -  `%j` - JSON. Replaced with the string '[Circular]' if the argument contains circular references.
 -  `%%` - single percent sign ('%'). This does not consume an argument.

If the placeholder `does not have a corresponding argument`, `the placeholder is not replaced`.

```js
util.format('%s:%s', 'foo'); // 'foo:%s'
```
    
If there are more arguments than placeholders, the extra arguments are coerced to strings (for objects and symbols, util.inspect() is used) and then concatenated, delimited by a space.

```js    
util.format('%s:%s', 'foo', 'bar', 'baz'); // 'foo:bar baz'
```
   
If the first argument is not a format string then util.format() returns a string that is the `concatenation of all its arguments separated by spaces`. Each argument is converted to a string with util.inspect().

```js   
util.format(1, 2, 3); // '1 2 3'
```


## [Errors](https://nodejs.org/dist/latest-v4.x/docs/api/errors.html)

### Error Propagation and Interception

#### `Synchronous`

```js
// Throws with a ReferenceError because z is undefined
try {
  const m = 1;
  const n = m + z;
} catch (err) {
  // Handle the error here.
}
```

#### `Asynchronous`

 - Most asynchronous methods that accept a `callback function will accept an Error object passed as the first argument to that function`. 
 If that first argument is `not null` and is `an instance of Error`, then an error occurred that should be handled.

```js
const fs = require('fs');

fs.readFile('a file that does not exist', (err, data) => {
    if (err) {
        console.error('There was an error reading the file!', err);
        return;
    }
    // Otherwise handle the data
});
```

Most asynchronous methods exposed by the Node.js core API follow an idiomatic pattern referred to as a "Node.js style callback". 
With this pattern, a callback function is passed to the method as an argument. 
When the operation either completes or an error is raised, the callback function is called with the Error object (if any) passed as the first argument. 
If no error was raised, the first argument will be passed as null.

```js
const fs = require('fs');

function nodeStyleCallback(err, data) {
    if (err) {
        console.error('There was an error', err);
        return;
    }
    console.log(data);
}

fs.readFile('/some/file/that/does-not-exist', nodeStyleCallback);
fs.readFile('/some/file/that/does-exist', nodeStyleCallback)
```

The JavaScript `try / catch` mechanism `cannot be used to intercept errors generated by asynchronous APIs`. 
A common mistake for beginners is to try to use throw inside a Node.js style callback: 

```js
// THIS WILL NOT WORK:
const fs = require('fs');

try {
    fs.readFile('/some/file/that/does-not-exist', (err, data) => {
        // mistaken assumption: throwing here...
        if (err) {
            throw err;
        }
    });
} catch(err) {
    // This will not catch the throw!
    console.log(err);
}
```

 - When an asynchronous method is called on an object that is an `EventEmitter`, errors can be routed to that object's 'error' event.
 
```js
const net = require('net');
const connection = net.connect('localhost');

// Adding an 'error' event handler to a stream:
connection.on('error', (err) => {
    // If the connection is reset by the server, or if it can't
    // connect at all, or on any sort of error encountered by
    // the connection, the error will be sent here.
    console.error(err);
});

connection.pipe(process.stdout);
```

For all `EventEmitter` objects, if an 'error' event handler is not provided, the error will be thrown, causing the Node.js process to report an unhandled exception and crash unless either: The domain module is used appropriately or a handler has been registered for the process.on('uncaughtException') event.

```js
const EventEmitter = require('events');
const ee = new EventEmitter();

setImmediate(() => {
    // This will crash the process because no 'error' event
    // handler has been added.
    ee.emit('error', new Error('This will crash'));
});
```

**Errors generated in this way cannot be intercepted using try / catch as they are thrown after the calling code has already exited.**

### `Class: Error`

A generic JavaScript Error object that does not denote any specific circumstance of why the error occurred. 
Error objects capture a "stack trace" detailing the point in the code at which the Error was instantiated, and may provide a text description of the error.

All errors generated by Node.js, including all System and JavaScript errors, will either be instances of, or inherit from, the Error class. 

### `new Error(message)`

Creates a `new Error` object and sets the `error.message` property to the provided text message. 
If an object is passed as message, the text message is generated by calling `message.toString()`. 
The `error.stack` property will represent the point in the code at which `new Error()` was called. 

### `Error.captureStackTrace(targetObject[, constructorOpt])`

Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. 

The optional `constructorOpt` argument accepts a function. 
If given, all frames above `constructorOpt`, including `constructorOpt`, will be `omitted from the generated stack trace`. 

The `constructorOpt` argument is useful for `hiding implementation details of error generation from an end user`.

```js
function MyError() {
    Error.captureStackTrace(this, MyError);
}
```

### `Error.stackTraceLimit`

The `Error.stackTraceLimit` property specifies the `number of stack frames collected by a stack trace`.

The default value is `10` but may be set to any valid JavaScript number. 
Changes will affect any stack trace captured after the value has been changed. 

### `error.message`

Returns the `string description of error` as set by calling `new Error(message)`.
The `message` passed to the constructor will also appear `in the first line of the stack trace of the Error`.

```js
const err = new Error('The error');

console.log(err.message); // 'The error'
```

### `error.stack`

Returns a `string describing the point in the code` at which the `Error` was instantiated.

```bash
Error: Things keep happening!
   at /home/gbusey/file.js:525:2
   at Frobnicator.refrobulate (/home/gbusey/business-logic.js:424:21)
   at Actor.<anonymous> (/home/gbusey/actors.js:400:8)
   at increaseSynergy (/home/gbusey/actors.js:701:6)
```

### `Exceptions vs. Errors`
    
A JavaScript exception is a value that is thrown as a `result of an invalid operation or as the target of a throw statement`. 
While it is not required that these values are instances of Error or classes which inherit from Error, all exceptions thrown by Node.js or the JavaScript runtime will be instances of Error. 


## [V8](https://nodejs.org/dist/latest-v4.x/docs/api/v8.html)

This module exposes events and interfaces specific to the version of V8 built with Node.js. 
These interfaces are subject to change by upstream and are therefore not covered under the stability index. 

### `getHeapStatistics()`

Returns an object with the following properties
 
```js
{
  total_heap_size: 7326976,
  total_heap_size_executable: 4194304,
  total_physical_size: 7326976,
  total_available_size: 1152656,
  used_heap_size: 3476208,
  heap_size_limit: 1535115264
}
```

## [Stream]()

Link: https://itarchitectblog.wordpress.com/2014/11/18/node-js-streams/