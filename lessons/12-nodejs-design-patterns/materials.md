# Design Patterns in Node.js

## Creational Patterns

### Singletons

The singleton patterns `restricts object creation for a class to only one instance`.
Creating singletons in Node.js is pretty straightforward, as require is there to help you.

#### Advantages

 - Reduced memory footprint
 - Single point of access
 - Delayed initialization that prevents instantiation until required

#### Disadvantages

 - Once instantiated, they're hardly ever "reset"
 - Harder to unit test and sometimes introduces hidden dependencies

#### Links:

 - https://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript

#### Example (classic):

```js
var Singleton = (function () {
    var instance;
 
    function createInstance() {
        return new Object("I am the instance");;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

function run() {
    var instance1 = Singleton.getInstance();
    var instance2 = Singleton.getInstance();
 
    console.log("Same instance? " + (instance1 === instance2));  
}
```

#### Example 1:

```js
let count = 0;

module.exports = function() {
   console.log('Count:', ++count);
}; 
```

```js
const counterA = require('./counter');
const counterB = require('./counter');

counterA();
counterB();
counterA();
```

#### Example 2:

```js
class Counter {
    constructor() {
        this._count = 0;
    }
    
    inc() {
        console.log('Count:', ++this._count);
    }
}

module.exports = new Counter();

```

```js
const counterA = require('./counter');
const counterB = require('./counter');

counterA.inc();
counterB.inc();
counterA.inc();
```

## Factory

The factory pattern is a creational pattern that doesn't require us to use a constructor but provides a generic interface for creating objects. 
This pattern can be really useful when the creation process is complex.

### Advantages

 - Makes complex object creation easy through an interface that can bootstrap this process for you
 - Great for generating different objects based on the environment
 - Practical for components that require similar instantiation or methods
 - Great for decoupling components by bootstrapping the instantiation of a different object to carry out work for particular instances

### Disadvantages

 - Unit testing can be difficult as a direct result of the object creation process being hidden by the factory methods

### Links

 - https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript
 

### Example (classic):

```js
function MyClass (options) {  
  this.options = options;
}

function create(options) {  
  // modify the options here if you want
  return new MyClass(options);
}

module.exports.create = create; 
```

### Example 1:

```js
function createImage(name) {
  if (name.match(/\.jpeg$/)) {
    return new JpegImage(name);
  } else if (name.match(/\.gif$/)) {
    return new GifImage(name);
  } else if (name.match(/\.png$/)) {
    return new PngImage(name);
  } else {
    throw new Exception('Unsupported format');
  }
}
```

### Example 2:

```js
class Profiler {
    constructor(label) {
        this.label = label;
        this.lastTime = null;
    }

    start() {
        this.lastTime = process.hrtime();
    }

    end() {
        var diff = process.hrtime(this.lastTime);
        var millis = (diff[0] * 1e9 + diff[1]) / 1e6;
        console.log('Timer "%s" took %d ms', this.label, millis);
    }
}

module.exports = function(label) {
    if (process.env.NODE_ENV === 'development') {
        return new Profiler(label);

    } else if (process.env.NODE_ENV === 'production') {
        return {
            start: function() {},
            end: function() {}
        }

    } else {
        throw new Error('Must set NODE_ENV');
    }
};
```

```js
var profiler = require('./profiler');

function getRandomArray(len) {
    var p = profiler('Generating a ' + len + ' items long array');

    p.start();

    var arr = [];
    for(var i = 0; i < len; i++) {
        arr.push(Math.random());
    }

    p.end();
}

getRandomArray(1e6);
console.log('Done');
```


### Prototype

The prototype pattern focuses on creating an object that can be used as a blueprint for other objects through prototypal inheritance. 
This pattern is inherently easy to work with in JavaScript because of the native support for prototypal inheritance in JS which means we don't need to spend time or effort imitating this topology.

#### Advantages

 - New objects created from the "skeleton" of an existing object inherit references to existing functions on the prototype chain, thus boosting performance and keeping memory footprints to a minimum.
 - Great for an application where the focus is on object creation

#### Disadvantages

 - Overkill for a project that uses very few objects and/or does not have an underlying emphasis on the extension of prototype chains

```js 
function BaseAccess() {
    this.url = 'api.abstract.com';
}

BaseAccess.prototype.send = function(message) {
    console.log('Sent message "%s" to server %s', message, this.url);
};


function AmazonAccess() {
    this.url = 'api.aws.com';
}

AmazonAccess.prototype = new BaseAccess();


var amazonAccess = new AmazonAccess();

amazonAccess.send('Hello, AWS!'); // Sent message "Hello, AWS!" to server api.aws.com
```


## Structural Patterns

### Proxy 

A proxy is an object that controls the access to another object called `subject`. 
The proxy and the subject have an identical interface and this allows us to transparently swap one for the other; in fact, the alternative name for this pattern is `surrogate`. 
A proxy intercepts all or some of the operations that are meant to be executed on the subject, augmenting or complementing their behavior. 

![](static/images/pattern-proxy.png)

**A proxy is useful in several circumstances, for example, consider the following ones:**

 - `Data validation`: The proxy validates the input before forwarding it to the subject
 - `Security`: The proxy verifies that the client is authorized to perform the operation and it passes the request to the subject only if the outcome of the check is positive
 - `Caching`: The proxy keeps an internal cache so that the operations are executed on the subject only if the data is not yet present in the cache
 - `Lazy initialization`: If the creation of the subject is expensive, the proxy can delay it to when it's really necessary
 - `Logging`: The proxy intercepts the method invocations and the relative parameters, recoding them as they happen
 - `Remote objects`: A proxy can take an object that is located remotely, and make it appear local


#### Object composition example

```js
function createProxy(subject) {
  var proto = Object.getPrototypeOf(subject);
   
  function Proxy(subject) {
    this.subject = subject;
  }
  
  Proxy.prototype = Object.create(proto);
  
  // proxied method
  Proxy.prototype.message = function() {
    return this.subject.message() + ' world!';
  }
  
  // delegated method
  Proxy.prototype.terminate = function() {
    return this.subject.terminate.apply(this.subject, arguments);
  }
  
  return new Proxy(subject);
}
```

```js
function createProxy(subject) {
  return {
  
    // proxied method
    message: function() {
      return subject.message() + ' world!';
    },
  
    // delegated method
    terminate: function() {
      return subject.terminate.apply(subject, arguments);
    }
    
  };
}
```

#### Object augmentation (or monkey patching) example

```js
function createProxy(subject) {
  var messageOrig = subject.message;
  
  subject.message = function() {
    return messageOrig.call(this) + ' world!';
  }
  
  return subject;
}
```

#### Example 

```js
'use strict';

module.exports = function(writableOrig) {
    var proto = Object.getPrototypeOf(writableOrig);

    function LoggingWritable(subject) {
        this.writableOrig = subject;
    }

    LoggingWritable.prototype = Object.create(proto);

    LoggingWritable.prototype.write = function(chunk, encoding, callback) {
            if (!callback && typeof encoding === 'function') {
                callback = encoding;
                encoding = undefined;
            }

            console.log('Writing:', chunk);

            return this.writableOrig.write(chunk, encoding, function() {
                console.log('Finished writing:', chunk);
                callback && callback(null);
            });
        };

    LoggingWritable.prototype.on = function() {
        return this.writableOrig.on.apply(this.writableOrig, arguments);
    };

    LoggingWritable.prototype.end = function() {
        return this.writableOrig.end.apply(this.writableOrig, arguments);
    };

    return new LoggingWritable(writableOrig);
};
```

```js
var fs = require('fs');

const proxy = require('./proxy');

var writable = fs.createWriteStream('./test.txt');

var writableProxy = proxy(writable);

writableProxy.write('First chunk');
writableProxy.write('Second chunk');
writable.write('This is not logged');
writableProxy.end();

// Writing: First chunk
// Writing: Second chunk
// Finished writing: First chunk
// Finished writing: Second chunk
```


### Decorator
    
Decorator is a structural pattern that consists of dynamically augmenting the behavior of an existing object. 
It's different from classical inheritance, because the behavior is not added to all the objects of the same class but only to the instances that are explicitly decorated.

Implementation-wise, it is very similar to the Proxy pattern, but instead of enhancing or modifying the behavior of the existing interface of an object, it augments it with new functionalities.

![](static/images/pattern-decorator.png)

#### Object composition example

```js
function decorate(component) {
  var proto = Object.getPrototypeOf(component);

  function Decorator(component) {
    this.component = component;
  }
  
  Decorator.prototype = Object.create(proto);
  
  //new method
  Decorator.prototype.settings = function() {
    //...
  };
  
  //delegated method
  Decorator.prototype.message = function() {
    this.component.message.apply(this.component, arguments);
  };
  
  return new Decorator(component);
}
```

#### Object augmentation (or monkey patching) example

```js
function decorate(component) {

  //new method
  component.settings = function() {
    //...
  };
  
  return component;
}
```

