# Node.js Design Fundamentals

 - **Conceptions**
   - **Asynchronous**
   - **Event Loop**
   - **IO operations**
   - **Non blocking**

 - **Components**
   - **V8**
   - **libuv**
 
 
## Operations that are performed in `main thread` using `asynchronous non-blocking` system calls or in `worker threads`. 

| Operation   | Main thread   | Worker thread   |
|-------------|:-------------:|:---------------:|
| DNS         |               | X               |
| Filesystem  |               | X               |
| Pipe        | X             |                 |
| TCP         | X             |                 |
| TTY         | X             |                 |
| UDP         | X             |                 |

   
   
## What Makes Node.js Faster Than Java? ([source](https://strongloop.com/strongblog/node-js-is-faster-than-java/))

### Java

![Java Threading](../../static/images/threading-java-small.png)

### Node.js

![Node.js Threading](../../static/images/threading-node-small.png)


## Components 

**JS + V8 + libuv = Node.js**

![Node.js Codebase](../../static/images/node-codebase.jpg)

### V8

Link: https://developers.google.com/v8/

### Libuv

Link: http://nikhilm.github.io/uvbook/index.html

