# New in ECMAScript 2015 (ES6)

## References

 * [Standard ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
 * [ECMAScript 2015 (ES6) in Node.js](https://nodejs.org/en/docs/es6/)


## Constants

Support for constants (also known as "immutable variables"), i.e. variables which cannot be re-assigned new content.

```js
// Base const declaration
const CHUNK_SIZE = 1024;

// Try declarete one const twice
const MAX_SIZE = 10;
const MAX_SIZE = 20; // SyntaxError: Identifier 'MAX_SIZE' has already been declared

// Try rewrite const
const RETRY_COUNT = 10;
RETRY_COUNT = 100; // TypeError: Assignment to constant variable.

// Important: rewrite const as object
const USER_SETTINGS = { size: 1024 };
USER_SETTINGS.size = 1;
console.log(USER_SETTINGS); // { size: 1 }
```

#### Notes: 

 * Remember constants created using `const` keyword have function level scope like variables created with `var` keyword.

***


## Constant Objects

Creating a constant object in which new properties could not be added, modified or removed.

```js
// Freeze const as object
const USER_SETTINGS = { size: 1024 };
Object.freeze(USER_SETTINGS);
USER_SETTINGS.size = 1; // TypeError: Cannot assign to read only property 'size' of #<Object>

// Important: not freeze recursive
const REFERENCE_OBJECT = { a: { b: true } };
Object.freeze(REFERENCE_OBJECT);
REFERENCE_OBJECT.a.c = false;
console.log(REFERENCE_OBJECT); // { a: { b: true, c: false } }
```

#### Notes:

 * Note that `values that are objects can still be modified`, unless they are also frozen.

***


## Block-Scoped Variables
  
Block-scoped variables `without hoisting`.

```js
// ES6 
for (let i = 0; i < 10; i++) {
    let user = { index: i };
}

console.log(user); // ReferenceError: user is not defined

// ES5
for (var i = 0; i < 10; i++) {
    let user = { index: i };
}

console.log(user); // { index : 9 }
```

``` js
// ES6 
if (true) {
    let count = 1;
}
  
console.log(count); // ReferenceError: count is not defined

// ES5
if (true) {
    var count = 1;
}
  
console.log(count); // 1
```

## Block-Scoped Functions

Block-scoped function definitions.

```js
function getUser() { return 'USER A'; }

console.log(getUser()); // 'USER A'

if (true) {
    function getUser() { return 'USER B'; }
    console.log(getUser()); // 'USER B'
}

console.log(getUser()); // 'USER A'
```

Notes:

 * In Node.js supports in `strict mode` only [[reference](https://nodejs.org/en/docs/es6/#ref-1)]

***

## Arrow Functions 

#### Shorten functions

```js
var users = ['Ann', 'Valentino', 'Scott'];

// ES5
//var namesLength = users.map(function(user) { return user.length });

// ES6
var namesLength = users.map( user => user.length );
```

#### Without arguments

```js
// ES6
var getTimestamp = () => Date.now();

// ES5
var getTimestamp = function() {
    return Date.now();
}
```

#### One argument

```js
// ES6
var getNext = index => index + 1;

// ES6
var getNext = (index) => index + 1;

// ES5
var getNext = function(index) {
    return index + 1;
}
```

#### Two arguments

```js
// ES6
var getSum = (num1, num2) => num1 + num2;

// ES6
var getSum = (num1, num2) => { return num1 + num2 };

// ES5
var getSum = function(num1, num2) {
    return num1 + num2;
}
```

#### Return literal

```js
// ES6
var getUser = id => ({ id: id, app: 'ProTools' });

// ES5
var getUser = function(id) {
    return { id: id, app: 'ProTools' };
}
```

#### Statement body

```js 
// ES6
var delay = callback => {
    setTimeout(callback, 200);
};

// ES5
var delay = function(callback) {
    setTimeout(callback, 200);
};
```

#### Lexical `this`

```js
// ES5 (with error)
function Counter() {
    this._count = 0;

    setInterval(function() {
        console.log('Iteration:', ++this._count); // Iteration: NaN, NaN...
    }, 1000);
}

var counter = new Counter();


// ES5 (with fix by `self` variable)
function Counter() {
    var self = this;

    self._count = 0;

    setInterval(function() {
        console.log('Iteration:', ++this._count); // Iteration: 1, 2, 3...
    }, 1000);
}

var counter = new Counter();


// ES5 (with fix by `bind`)
function Counter() {
    this._count = 0;

    setInterval(function() {
        console.log('Iteration:', ++this._count); // Iteration: 1, 2, 3...
    }.bind(this), 1000);
}

var counter = new Counter();


// ES6
function Counter() {
    this._count = 0;

    setInterval(() => {
        console.log('Iteration:', ++this._count); // Iteration: 1, 2, 3...
    }, 1000);
}

var counter = new Counter();
```

#### Total

```js
function () { return 10; }
() => { return 10; }
() => 10
 
function (a) { return a * 5; }
(a) => { return a * 5; }
(a) => a * 5
a => a * 5
 
function (a, b) { return a * b; }
(a, b) => { return a * b; }
(a, b) => a * b
 
function () { return arguments[0]; }
(...args) => args[0]
 
() => {} // undefined
() => ({}) // {}
```

#### Notes:

 * Arrow functions capture the `this` value of the enclosing context