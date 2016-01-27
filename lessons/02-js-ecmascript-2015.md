# New in ECMAScript 2015 (ECMAScript 6)

## Constants

Support for constants (also known as "immutable variables"), i.e. variables which cannot be re-assigned new content.

#### ECMAScript 6 
```js
const CHUNK_SIZE = 1024;
```

#### Examples
```js
const MAX_SIZE = 10;
const MAX_SIZE = 20; // Uncaught TypeError: Identifier 'MAX_SIZE' has already been declared


const RETRY_COUNT = 10;
RETRY_COUNT = 100;
console.log(RETRY_COUNT); // 10


const USER_SETTINGS = { size : 1024 };
USER_SETTINGS = { size: 1 };
console.log(USER_SETTINGS); // { size : 1024 }
```

***


