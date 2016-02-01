# Getting started

## Node.js Current Versions

Link: https://nodejs.org/en/download/

## Node.js Previous Releases

Link: https://nodejs.org/en/download/releases/

## Installation Node.js

Link: https://nodejs.org/en/download/package-manager/

## Node.js Versions Control (NVM)

Link: https://github.com/creationix/nvm/blob/master/README.markdown

## CLI commands

### Check version

```bash
user@server ~ $ node -v
v4.2.6
```

### Check extend versions

```bash
user@server ~ $ node
> process.versions
{ http_parser: '2.5.0',
  node: '4.2.6',
  v8: '4.5.103.35',
  uv: '1.8.0',
  zlib: '1.2.8',
  ares: '1.10.1-DEV',
  icu: '56.1',
  modules: '46',
  openssl: '1.0.2e' }
> 
```

### Run command

```bash
user@server ~ $ node
> let count = 120 * 5;
undefined
> console.log('Result:', count);
Result: 600
undefined
> 
```

### Run script

#### Create file `demo.js` and add content:
```js
let interval = setInterval(function() {
    console.log('Current time:', new Date().toISOString());
}, 1000);
```

#### Run this script:
```bash
user@server ~ $ node demo.js
```

#### Example of output:
```bash
Current time: 2016-02-01T21:09:36.364Z
Current time: 2016-02-01T21:09:37.366Z
Current time: 2016-02-01T21:09:38.367Z
Current time: 2016-02-01T21:09:39.368Z
Current time: 2016-02-01T21:09:40.369Z
```

### Run HTTP server

#### Create file `server.js` and add content:
```js
const http = require('http');

const port = 3000;

var server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello! I am Node.js server!');
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
```

#### Run this script:
```bash
user@server ~ $ node server.js
```

#### Example of output:
```bash
Server running at http://localhost:3000/
```

#### Go to link [http://localhost:3000/](http://localhost:3000/)
