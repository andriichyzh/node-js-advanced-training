# New in ECMAScript 2015 (ES6)

## References

 * [ECMAScript 6 — New Features: Overview & Comparison](http://es6-features.org/)
 * [Standard ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
 * [ECMAScript 2015 (ES6) in Node.js](https://nodejs.org/en/docs/es6/)
 * [ECMAScript 2015 (ES6) compatibility table](https://kangax.github.io/compat-table/es6/)


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

 * Remember constants created using `const` keyword have `block` level scope!

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
    var user = { index: i };
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
var namesLength = users.map(function(user) { return user.length });

// ES6
let namesLength = users.map( user => user.length );
```

#### Without arguments

```js
// ES6
let getTimestamp = () => Date.now();

// ES5
var getTimestamp = function() {
    return Date.now();
}
```

#### One argument

```js
// ES6
let getNext = index => index + 1;

// ES6
let getNext = (index) => index + 1;

// ES5
var getNext = function(index) {
    return index + 1;
}
```

#### Two arguments

```js
// ES6
let getSum = (num1, num2) => num1 + num2;

// ES6
let getSum = (num1, num2) => { return num1 + num2 };

// ES5
var getSum = function(num1, num2) {
    return num1 + num2;
}
```

#### Variable count of arguments (rest parameters)

```js
// ES5
var getFirstArg = function() { return arguments[0]; }

// ES6, Not works in Node 4.2
let getFirstArg = (...args) => args[0];
```

#### Return literal

```js
// ES6
let getUser = id => ({ id: id, app: 'ProTools' });

// ES5
var getUser = function(id) {
    return { id: id, app: 'ProTools' };
}
```

#### Statement body

```js 
// ES6
let delay = callback => {
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

let counter = new Counter();
```

#### Total

```js
function() { return 10; }
() => { return 10; }
() => 10
 
function(a) { return a * 5; }
(a) => { return a * 5; }
(a) => a * 5
a => a * 5
 
function(a, b) { return a * b; }
(a, b) => { return a * b; }
(a, b) => a * b

function() { return arguments[0]; }
(...args) => args[0]
 
() => {} // undefined
() => ({}) // {}
```

#### Notes:

 * Arrow functions capture the `this` value of the enclosing context
 
***


## Default Parameter Values

Simple and intuitive `default values` for function parameters.

```js
// ES6 (from Node 6.0.0.+)
const createUser = (name = 'anonymous', age = 18, isExisted = true) => {
    return { name, age, isExisted };
}

createUser(); // { name: 'anonymous', age: 18, isExisted: true }

// ES5
var createUser = function(name, age, isExisted) {
    return {
        name: name || 'anonymous',
        age: age || 18,
        isExisted: isExisted === undefined ? true : isExisted
    };
}

createUser(); // { name: 'anonymous', age: 18, isExisted: true }
```

#### Evaluated at call time

```js
// ES6 (from Node 6.0.0.+)
function add(value, cache = []) {
  cache.push(value);
  return cache;
}

add(1); // [1]
add(2); // [2]
```


#### Default parameters can get default value as result of call other function

```js
// ES6 (from Node 6.0.0.+)
function createAsset() {
    return { alias: 'default' };
}

function createUploader(path, asset = createAsset()) {
    ...
}

let uploader = createUploader('/tmp/music.mp3');
```


#### Default parameters are available to later default parameters

```js
// ES6 (from Node 6.0.0.+)
function getMessage(userId, userName = 'User:' + userId) {
    ...
}
```

***

## Template Literals 

Intuitive expression interpolation for single-line and multi-line strings.

#### String Interpolation

```js 
// ES6
const customer = { name: 'John' };
const message = `Hello, ${customer.name}! How are you?`;

console.log(message); // Hello, John! How are you?


// ES6
const car = {
    vendor: 'BMW',
    model: 'M4',
    power: 300
};

const text = `New car ${car.vendor} ${car.model}
with engine ${car.power} hp`;

console.log(text);

// New car BMW M4
// with engine 300 hp
```

***

## Extended Literals (Binary & Octal)

```js
// ES5
parseInt('10000000000', 2) === 1024; // true
parseInt('2000', 8) === 1024; // true

// ES6
0b10000000000 === 1024; // true
0o2000 === 1024; // true
```

***

## Objects

#### Function `Object.assign`

```js
let target = { a: 100 };
let first = { a: 1, b: { c: true } };
let second = { b: { c: false, d: 'hello' } };

// target <- first <- second
console.log(Object.assign(target, first, second)); // { a: 1, b: { c: false, d: 'hello' } }
console.log(target);                               // { a: 1, b: { c: false, d: 'hello' } }
```

```js
let first = { a: 1, b: { c: true } };

let clone = Object.assign({}, first); // { a: 1, b: { c: true } }
```

#### Function `Object.is`

```js
console.log(Object.is({ b: 1 }, { b: 1 })); // false
console.log({ b: 1 } === { b: 1 });         // false

console.log(Object.is(+0, -0)); // false
console.log(+0 === -0);         // true

console.log(Object.is(NaN, NaN)); // true
console.log(NaN === NaN);         // false
```

***

## Iterator `for..of`

```js
let arr = [1, 2, 3];

for (let value of arr) {
    console.log(value);
}

// 1
// 2
// 3

let str = 'Hello';

for (let value of str) {
    console.log(value);
}

// H
// e
// l
// l
// o

let obj = { a: 1, b: 2, c: 3 };

for (let value of Object.keys(obj)) {
    console.log(value);
}

// a
// b
// c
```

***

## Symbol

```js 
// Without `new` as primitive
let sym = Symbol();
console.log(typeof sym); // symbol


console.log(Symbol('id') == Symbol('id')); // false
```

#### Global Symbol

```js
let id = Symbol.for('id');

console.log(Symbol.for('id') === id); // true
console.log(Symbol.keyFor(id)); // 'id'
```

#### Example of usage

```js 
let revision = Symbol('revision');
let privateId = Symbol('privateId');
let globalZone = Symbol.for('zone');

let document = {
    id: '123',
    [revision]: 10,
    [privateId]: '123abc',
    [globalZone]: 'US'
};

console.log(document); // { id: '123' }
console.log(JSON.stringify(document)); // '{"id":"123"}'

console.log(document[revision]); // 10
console.log(document[privateId]); // '123abc'

console.log(document[Symbol.for('zone')]); // 'US'
```

***

## Classes

#### Class declarations

```js
class Edge {
    constructor(source, target) {
        this.source = source;
        this.target = target;
    }
}

let edge = new Edge('A', 'B');
```

```js
// Class declarations are not hoisted!
let edge = new Edge(); // ReferenceError: Edge is not defined

class Edge {}
```

#### Class expressions

```js
// Unnamed
let Edge = class {
    constructor(source, target) {
        this.source = source;
        this.target = target;
    }
}

// Named
let Edge = class Edge {
    constructor(source, target) {
        this.source = source;
        this.target = target;
    }
}
```

#### Prototype methods

```js
class Edge {
    constructor(source, target) {
        this.source = source;
        this.target = target;
    }

    get title() {
        return this.getTitle();
    }

    getTitle() {
        return this.source + '->' + this.target;
    }
}

let edge = new Edge('A', 'B');

console.log(edge.title); // A->B
```

#### Static methods

```js
class Edge {
    constructor(source, target) {
        this.source = source;
        this.target = target;
    }

    static hasCommonVertex(edge1, edge2) {
        return edge1.source === edge2.source || edge1.target === edge2.target;
    }
}

let edge1 = new Edge('A', 'B');
let edge2 = new Edge('A', 'C');

console.log(Edge.hasCommonVertex(edge1, edge2)); // true
```

#### Sub classing with extends

```js
class BaseEdge {
    constructor(source, target) {
        this.source = source;
        this.target = target;
    }

    isValid() {
        return typeof this.source === 'string' && typeof this.target === 'string';
    }
}

class Edge extends BaseEdge {
    static hasCommonVertex(edge1, edge2) {
        return edge1.source === edge2.source || edge1.target === edge2.target;
    }
}

let edge1 = new Edge('A', 'B');
let edge2 = new Edge('A', 'C');

console.log(Edge.hasCommonVertex(edge1, edge2)); // true
console.log(edge1.isValid()); // true
```

#### Super class calls with super

```js
class BaseEdge {
    constructor(source, target) {
        this.source = source;
        this.target = target;
    }

    isValid() {
        return typeof this.source === 'string' && typeof this.target === 'string';
    }
}

class Edge extends BaseEdge {
    isValid() {
        return super.isValid() && this.source !== this.target;
    }
}

let edge = new Edge('A', 'B');

console.log(edge.isValid()); // true
```

#### Notes:

 * `Class declarations` are not hoisted!

***

## Collections

### Map

```js
let store = new Map();

store.set('ABC', 'done');
store.set('123', { user: '123' });

console.log(store.size); // 2

console.log(store.has('123')); // true
console.log(store.get('123')); // { user: '123' }

store.delete('123');

console.log(store.has('123')); // false
console.log(store.get('123')); // undefined

console.log(store.size); // 1

store.clear();

console.log(store.size); // 0
```

#### Iterating Maps with `for..of`

```js
let store = new Map();

store.set(1, 'one');
store.set(2, 'two');
store.set(3, 'three');

for (let key of store.keys()) {
    console.log(key);
}

// 1
// 2
// 3

for (let value of store.values()) {
    console.log(value);
}

// 'one'
// 'two'
// 'three'

// Not works in Node 4.2
for (let [key, value] of store.entries()) {
    console.log(key + ' => ' + value);
}

// Not works in Node 4.2
for (let [key, value] of store) {
    console.log(key + ' => ' + value);
}

// 1 => one
// 2 => two
// 3 => three
```

#### Iterating Maps with `forEach()`

```js
let store = new Map();

store.set(1, 'one');
store.set(2, 'two');
store.set(3, 'three');

store.forEach(function(value, key) {
    console.log(key + ' => ' + value);
}, store);

// 1 => one
// 2 => two
// 3 => three
```

#### Relation with `Array`

```js
let sourceData = [[1, 'one'], [2, 'two'], [3, 'three']];

let store = new Map(sourceData);

store.forEach(function(value, key) {
    console.log(key + ' => ' + value);
}, store);

// 1 => one
// 2 => two
// 3 => three
```

### Set

```js
let set = new Set();

set.add('001');
set.add('002');
set.add('003');
set.add('003');
set.add('002');
set.add('001');

console.log(set.size); // 3
console.log(set.has('001')); // true

set.delete('001');

console.log(set.size); // 2
console.log(set.has('001')); // false

set.clear();

console.log(set.size); // 0
```

### WeakMap / WeakSet

```js 
let activeJobs = [
    { title: 'create', id: '001' },
    { title: 'update', id: '002' },
    { title: 'delete', id: '003' }
];

let weakMap = new WeakMap();

weakMap[activeJobs[0]] = { user: 'User A' };
weakMap[activeJobs[1]] = { user: 'User B' };
weakMap[activeJobs[2]] = { user: 'User A' };

console.log(weakMap[activeJobs[0]]); // { user: 'User A' }

activeJobs.splice(0, 1); // should return 2 records in weakMap
activeJobs.splice(0, 1); // should return 1 record in weakMap
```

***

### Promise

```js
let promise = new Promise(function(resolve, reject) {
    ...
});

// onFulfilled - on resolve
// onRejected - on reject
promise.then(onFulfilled, onRejected);

// or
promise
    .then(onFulfilled)
    .catch(onRejected);
```

#### Sync throw

```js
let checker = new Promise((resolve, reject) => {
    throw new Error('Not found!');
});

checker.catch(err => console.log(err)); // [Error: Not found!]
```

#### Examples

```js
let timer = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(Date.now());
    }, 1000);
});

timer.then(
    result => console.log('Success:', result), // 'Success: 1453944667280'
    error => console.log('Error:', error)
);
```

```js
let timer = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('Critical error!'));
    }, 1000);
});

timer.then(
    result => console.log('Success:', result),
    error => console.log('Error:', error) // Error: [Error: Critical error!]
);
```

#### Create promise

```js
function createDelay(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date().toISOString());
        }, delay);
    });
}

let timer = createDelay(1000);

timer.then(
    result => console.log('Success:', result), // 'Success: 2016-01-28T01:35:56.541Z'
    error => console.log('Error:', error)
);
```

#### Run one by one

```js
function createDelay(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(delay + 100);
        }, delay);
    });
}

createDelay(1000)
    .then(createDelay)
    .then(createDelay)
    .then(createDelay)
    .then(result => console.log('Success:', result)); // 'Success: 1400'

createDelay(1000)
    .then(createDelay)
    .then(result => result + 500)
    .then(createDelay)
    .then(result => result + 500)
    .then(createDelay)
    .then(result => console.log('Success:', result)); // 'Success: 2400'
```

#### Run in parallel 

```js
function createDelay(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(delay + 100);
        }, delay);
    });
}

Promise.all([
    createDelay(1000),
    createDelay(1200),
    createDelay(1400)
]).then(results => console.log('Success:', results)); // 'Success: [ 1100, 1300, 1500 ]'
```

#### Only first result

```js
function createDelay(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(delay + 100);
        }, delay);
    });
}

Promise.race([
    createDelay(1000),
    createDelay(1200),
    createDelay(1400)
]).then(result => console.log('Success:', result)); // 'Success: 1100'
```

### Generators

```js
function* generateSteps() {
    yield { action: 'create' };
    yield { action: 'check' };
    return { action: 'send' };
}

let steps = generateSteps();

console.log(steps.next()); // { value: { action: 'create' }, done: false }
console.log(steps.next()); // { value: { action: 'check' }, done: false }
console.log(steps.next()); // { value: { action: 'send' }, done: true }
```

```js
function* generateSteps() {
    yield { action: 'create' };
    yield { action: 'check' };
    return { action: 'send' };
}

let steps = generateSteps();

for (let value of steps) {
    console.log(value);
}

// { action: 'create' }
// { action: 'check' }
```

```js
function* runner() {
    let result = yield 'Antonio';
    console.log(result);
}

let generator = runner();

let value = generator.next().value;

setTimeout(() => generator.next(`Hello, ${value}! Current time ${new Date().toISOString()}`), 1000);
```

#### Example 

```js
function createDelay(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(delay + 100);
        }, delay);
    });
}

function* taskExample() {

    let firstTime = yield createDelay(1000);

    console.log(Date.now(), firstTime);

    let secondTime = yield createDelay(firstTime);

    console.log(Date.now(), secondTime);

    return secondTime * 10;
}

function runner(generator, yieldValue) {
    let next = generator.next(yieldValue);

    if (!next.done) {
        next.value.then(
            result => runner(generator, result),
            err => generator.throw(err)
        );
    } else {
        console.log(next.value);
    }
}

runner(taskExample());

// '1453947173485 1100'
// '1453947174592 1200'
// 12000
```
