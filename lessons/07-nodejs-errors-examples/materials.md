# Errors Examples

 * **System errors**
 * **Standard JavaScript errors**
   * **SyntaxError**
   * **ReferenceError**
   * **TypeError**
 * **Assertion Errors**
 * **Custom errors**

## System Errors

### Different HTTP servers attempting to use same port

#### Create and run script:

```js
const http = require('http');

const port = 3000;

const serverOne = http.createServer();
const serverTwo = http.createServer();

serverOne.listen(port, () => {
    console.log(`Server One running at http://localhost:${port}/`);
});

serverTwo.listen(port, () => {
    console.log(`Server Two running at http://localhost:${port}/`);
});
```

#### Output with error:

```bash
Server One running at http://localhost:3000/
events.js:141
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE :::3000
    at Object.exports._errnoException (util.js:870:11)
    at exports._exceptionWithHostPort (util.js:893:20)
    at Server._listen2 (net.js:1237:14)
    at listen (net.js:1273:10)
    at Server.listen (net.js:1369:5)
    at Object.<anonymous> (/home/achyzh/server.js:12:11)
    at Module._compile (module.js:410:26)
    at Object.Module._extensions..js (module.js:417:10)
    at Module.load (module.js:344:32)
    at Function.Module._load (module.js:301:12)
```

### Attempting to open a file that does not exist

#### Create and run script: 

```js
const fs = require('fs');

fs.readFile('/tmp/1234567890', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

#### Output with error:

```bash
/home/user/file.js:4
    if (err) throw err;
             ^

Error: ENOENT: no such file or directory, open '/tmp/1234567890'
    at Error (native)
```

## Standard JavaScript errors

### SyntaxError

Thrown in response to improper JavaScript language syntax.

#### Create and run script:

```js
constant http = require('http');
```

#### Output with error:

```bash
/home/user/server.js:1
(function (exports, require, module, __filename, __dirname) { constant http = require('http');
                                                                       ^^^^

SyntaxError: Unexpected identifier
    at exports.runInThisContext (vm.js:53:16)
    at Module._compile (module.js:374:25)
    at Object.Module._extensions..js (module.js:417:10)
    at Module.load (module.js:344:32)
    at Function.Module._load (module.js:301:12)
    at Function.Module.runMain (module.js:442:10)
    at startup (node.js:136:18)
    at node.js:966:3
```

### ReferenceError

Thrown when using undefined variables

#### Create and run script:

```js
const result = 1000;
console.log(result + lastStep);
```

#### Output with error:

```bash
/home/user/counter.js:2
console.log(result + lastStep);
                     ^

ReferenceError: lastStep is not defined
    at Object.<anonymous> (/home/achyzh/server.js:3:22)
    at Module._compile (module.js:410:26)
    at Object.Module._extensions..js (module.js:417:10)
    at Module.load (module.js:344:32)
    at Function.Module._load (module.js:301:12)
    at Function.Module.runMain (module.js:442:10)
    at startup (node.js:136:18)
    at node.js:966:3
```

### TypeError

Thrown when passing arguments of the wrong type

#### Create and run script:

```js
const helper = null;
const result = helper.get();
```

#### Output with error:

```bash
/home/user/helper.js:2
const result = helper.get();
                     ^

TypeError: Cannot read property 'get' of null
    at Object.<anonymous> (/home/achyzh/server.js:2:22)
    at Module._compile (module.js:410:26)
    at Object.Module._extensions..js (module.js:417:10)
    at Module.load (module.js:344:32)
    at Function.Module._load (module.js:301:12)
    at Function.Module.runMain (module.js:442:10)
    at startup (node.js:136:18)
    at node.js:966:3
```

## Assertion Errors

Special class of error that can be triggered whenever Node.js detects an exceptional logic violation that should never occur.

### Set not valid parameter to `require()`

#### Create and run script:

```js
const lib = require({ location: '/etc/passwd' });
```

#### Output with error:

```bash
assert.js:89
  throw new assert.AssertionError({
  ^
AssertionError: path must be a string
    at Module.require (module.js:353:3)
    at require (internal/module.js:12:17)
    at Object.<anonymous> (/home/achyzh/server.js:1:75)
    at Module._compile (module.js:410:26)
    at Object.Module._extensions..js (module.js:417:10)
    at Module.load (module.js:344:32)
    at Function.Module._load (module.js:301:12)
    at Function.Module.runMain (module.js:442:10)
    at startup (node.js:136:18)
    at node.js:966:3
```
