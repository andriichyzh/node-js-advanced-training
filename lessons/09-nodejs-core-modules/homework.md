## Homework

1. Find the `fastest` and `slowest` ways to iterate loop in Node 4.2+ (try use functions `console.time()` + `console.timeEnd()` and `process.hrtime()`):

 - **Loop, basic**
	
```js
for (var i = 0; i < arr.length; i++) {
  someFn(i);
}
```

 - **While loop, basic**
	
```js
var i = 0;
while (i < arr.length) {
  someFn(i);
  i++;
}
```

 - **For loop, cached**
	
```js
for (var i = 0, len = arr.length; i < len; i++) {
  someFn(i);
}
```

 - **For loop, i--**
	
```js
for (var i = arr.length; i > 0; i--) {
  someFn(i);
}
```

 - **Do-while loop, i--**
	
```js
var i = arr.length - 1;
do {
  someFn(i);
}
while (i--);
```

 - **Do-while loop, --i**
	
```js
var i = arr.length;
if (i > 0) {
  do {
    someFn(i);
  }
  while (--i);
}
```

 - **For..in loop**
	
```js
for (var i in arr) {
  someFn(i);
}
```

 - **while loop i--**
	
```js
var i = arr.length;
while (i--) {
  someFn(i);
}
```

 - **For loop, i -= 1**
	
```js
for (var i = arr.length; i > 0; i -= 1) {
  someFn(i);
}
```

 - **For loop, i -= 1 II**
	
```js
var i;
for (i = arr.length; i > 0; i -= 1) {
  someFn(i);
}
```

 - **For loop**
	
```js
var i;
for (i = arr.length; i > 0; i--) {
  someFn(i);
}
```

 - **Yours other option**
 
```js
...
```

2. Create custom error for using in HTTP service

**Required:**

 - HTTP status code (eg `200`, `404`)
 - HTTP status message (eg `OK`, `NOT_FOUND`)
 - Error message (eg `File not found`)
 - `Name of component` where was created this error
 - Log level (eg `info`, `warn`)


3. Create `Readable` stream which generate Binary data with random size (5-1000 bytes).

4. Create `Writable` stream which save to file only 10 bytes from each chunk.

5. Create `Transform` stream which counts current average bandwidth (kbps) between generator of Binary data and writer to file (for connect try use `pipe`)

6. Create module for `sync` autoload files by path. In result you should have object with `key = module name` and `value = require('module')`

7. Write `async` module which count `factorial value` in different process (eg use `fork` or `exec` of child process)
