# Requiring asynchronously initialized modules

## Default option

### Path db/find-by-id.js

```js
module.exports = function(db) {
    return function(id, callback) {
        db.findOne({ id: id }, callback);
    }
}
```

### Path app.js

```js
const db = require('db');

const findByIdFactory = require('db/find-by-id');

db.on('connected', function() {
   ...
   const findById = findByIdFactory(db);
   ...
});
```

## Delay the evaluation

### Option 1

```js
const db = require('db');

module.exports = function(id, callback) {

    let runFind = function() {
        db.findOne({ id: id }, callback);
    };

    if (db.isConnected) {
        return runFind();
    }

    db.once('connected', runFind);
}
```

### Option 2 [npm: thunky](https://www.npmjs.com/package/thunky)

```js
var thunky = function(fn) {
	var run = function(callback) {
		var stack = [callback];

		state = function(callback) {
			stack.push(callback);
		};

		fn(function(err) {
			var args = arguments;
			var apply = function(callback) {
				if (callback) callback.apply(null, args);
			};

			state = isError(err) ? run : apply;
			while (stack.length) apply(stack.shift());
		});
	};

	var state = run;

	return function(callback) {
		state(callback);
	};
};

module.exports = thunky;
```