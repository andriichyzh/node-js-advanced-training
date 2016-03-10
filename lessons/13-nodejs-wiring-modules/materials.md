# Wiring Modules

 - Hardcoded dependency
 - Dependency injection
 - Service locator
 - Dependency injection containers

**Note**: Choose the right approach, depending on the balance between simplicity and reusability that we want to obtain.

## Hardcoded dependency

#### Path: clients/redis.js

```js
'use strict';

const redis = require('redis');

module.export = redis.createClient();
```

#### Path: models/auth.js

```js
'use strict';

const db = require('../clients/redis');

const SECRET_TOKEN = 'SECRET:KEY!';

exports.createToken = function(username, password, callback) {
    ...
    db.set(token, function(err) {
        ...
    });
}

exports.checkToken = function(token, callback) {
    ...
    db.get(token, function(err, res) {
        ...
    });
}
```

#### Path: controllers/auth.js

```js
'use strict';

const authModel =require('../models/auth');

exports.createToken = function(req, res, next) {
    ...
    authModel.createToken(req.body.username, req.body.password, function(err, result) {
        ...
    });
}

exports.checkToken = function(req, res, next) {
    ...
    authModel.checkToken(req.query.token, function(err, res) {
        ...
    });
}
```

#### Path: app.js

```js
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const authController =require('../controllers/auth');


app.post('/login', authController.createToken);
app.get('/check', authController.checkToken);

app.listen(3000);
```

### Conclusions

#### +++

 - Immediately intuitive organization
 - Easy to understand and debug
 - Each module initializes and wires itself without any external intervention

### ---

 - Testing modules in isolation can be a difficult task
 - Limits the possibility of wiring the module against other instances
 - Reusing modules in combination with another database instance would be close to impossible


## Dependency injection

#### Path: clients/redis.js

```js
'use strict';

const redis = require('redis');

module.export = function(options) {
    return redis.createClient(options);
};
```

#### Path: models/auth.js

```js
'use strict';

module.exports = function(db, secretToken) {
    let authModel = {};
    
    authModel.createToken = function(username, password, callback) {
        ...
        db.set(token, function(err) {
            ...
        });
    }
    
    authModel.checkToken = function(token, callback) {
        ...
        db.get(token, function(err, res) {
            ...
        });
    }

    return authModel;
}
```

#### Path: controllers/auth.js

```js
'use strict';

module.exports = function(authModel) {
    let authController = {};
    
    authController.createToken = function(req, res, next) {
        ...
        authModel.createToken(req.body.username, req.body.password, function(err, result) {
            ...
        });
    }
    
    authController.checkToken = function(req, res, next) {
        ...
        authModel.checkToken(req.query.token, function(err, res) {
            ...
        });
    }

    return authController;
}
```

#### Path: app.js

```js
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const redisFactory = require('./clients/redis');
const authModelFactory = require('./model/auth');
const authControllerFactory = require('./controllers/auth');

const client = redisFactory({ host: '192.168.1.100' });
const authModel = authModelFactory(client, 'SECRET:KEY123!');
const authController = authControllerFactory(authModel);



app.post('/login', authController.createToken);
app.get('/check', authController.checkToken);

app.listen(3000);
```

### The different types of dependency injection

#### Constructor injection

In this type of DI, the dependencies are passed to a constructor at the moment of its creation.

```js
const service = new Service(dependencyA, dependencyB); // works also with a factory
```

#### Property injection 

In this type of DI, the dependencies are attached to an object after its creation.

```js
const service = new Service();  // works also with a factory

service.dependencyA = anInstanceOfDependencyA;
service.dependencyB = anInstanceOfDependencyB;
```

### Conclusions

#### +++

 - Can reuse each module with minimal effort and without any change in their code
 - Testing a module is greatly simplified (we can easily provide mocked dependencies and test our modules in isolation from the state of the rest of the system)

#### ---

 - Increases the complexity and verbosity of our modules
 - More difficult to understand the relationship between the various components of a system
 - Had to manually build the dependency graph of the entire application (this can become unmanageable when the number of modules to wire becomes high)
 
 
## Service Locator
 
### Path: libs/locator.js

```js
'use strict';

module.exports = function() {
    const dependencies = {};
    const factories = {};
    const serviceLocator = {};
    
    serviceLocator.factory = function(name, factory) {   
        factories[name] = factory;
    };
    
    serviceLocator.register = function(name, instance) {  
        dependencies[name] = instance;
    };
    
    serviceLocator.get = function(name) {   
        if (!dependencies[name]) {
            let factory = factories[name];
            dependencies[name] = factory && factory(serviceLocator);
            
            if(!dependencies[name]) {
                throw new Error('Cannot find module: ' + name);
            }
        }
        
        return dependencies[name];
    };
    
    return serviceLocator;
};
```

#### Notes:

 - `factory()` is used to associate a component name against a factory.
 - `register()` is used to associate a component name directly with an instance.
 - `get()` retrieves a component by its name. If an instance is already available, it simply returns it.


#### Path: clients/redis.js

```js
'use strict';

const redis = require('redis');

module.export = function(serviceLocator) {
    const redisHost = serviceLocator.get('redisHost');
    return redis.createClient({ host: redisHost });
};
```

#### Path: models/auth.js

```js
'use strict';

module.exports = function(serviceLocator) {
    let authModel = {};
    
    const db = serviceLocator.get('redis');
    const secretToken = serviceLocator.get('secretToken');
    
    authModel.createToken = function(username, password, callback) {
        ...
        db.set(token, function(err) {
            ...
        });
    }
    
    authModel.checkToken = function(token, callback) {
        ...
        db.get(token, function(err, res) {
            ...
        });
    }

    return authModel;
}
```

#### Path: controllers/auth.js

```js
'use strict';

module.exports = function(authModel) {
    let authController = {};
    
    const authModel = serviceLocator.get('authModel');
    
    authController.createToken = function(req, res, next) {
        ...
        authModel.createToken(req.body.username, req.body.password, function(err, result) {
            ...
        });
    }
    
    authController.checkToken = function(req, res, next) {
        ...
        authModel.checkToken(req.query.token, function(err, res) {
            ...
        });
    }

    return authController;
}
```

#### Path: app.js

```js
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const locator = require('./libs/locator')();

locator.register('redisHost', '192.168.1.100');
locator.register('tokenSecret', 'SECRET:KEY123!');

locator.factory('redis', require('./clients/redis'));
locator.factory('authModel', require('./model/auth'));
locator.factory('authController', require('./controllers/auth'));

const authController = locator.get('authController');


app.post('/login', authController.createToken);
app.get('/check', authController.checkToken);

app.listen(3000);
```

### Easy form of pattern (closely resembling a service locator)

```js
const dependencies = {};

const redis = require('./clients/redis');
const authModel = require('./models/auth');

dependencies.redis = redis();
dependencies.authModel = authModel(dependencies);
```


### Conclusions

In terms of reusability, we can say that the service locator pattern sits in between `hardcoded dependencies` and `DI`.

#### +++

 - Shift the dependency ownership to an entity external to the component
 - We don't have to manually take care of building the entire dependency graph

#### ---

 - Harder to identify the relationship between the components, as they are resolved at runtime (service locator obfuscates the dependency requirements of a component)
 - Component relying on a service locator is less (equal with DI) reusable (because it requires that a service locator is available in the system)
 

## Dependency Injection Container

### Path: libs/locator.js

```js
'use strict';

const argsList = require('args-list');

module.exports = function() {
    const dependencies = {};
    const factories = {};
    const diContainer = {};
    
    diContainer.factory = function(name, factory) {   
        factories[name] = factory;
    };
    
    diContainer.register = function(name, instance) {  
        dependencies[name] = instance;
    };
    
    diContainer._inject = function(factory) {
        var args = argsList(factory).map(function(dependency) {
            return diContainer.get(dependency);
        });
        
        return factory.apply(null, args);
    };
    
    diContainer.get = function(name) {   
        if (!dependencies[name]) {
            let factory = factories[name];
            
            dependencies[name] = factory && diContainer._inject(factory);
            
            if(!dependencies[name]) {
                throw new Error('Cannot find module: ' + name);
            }
        }
        
        return dependencies[name];
    };
    
    return diContainer;
};
```

#### Notes:

 - We extract the arguments list from the factory function we receive as the input, using the `args-list` library.
 - We then map each argument name to the correspondent dependency instance retrieved using the `get()` method.
 - At the end, all we have to do is just invoke the factory by providing the dependency list that we just generated.


#### Path: clients/redis.js

```js
'use strict';

const redis = require('redis');

module.export = function(redisHost) {
    return redis.createClient({ redisHost: redisHost });
};
```

#### Path: models/auth.js

```js
'use strict';

module.exports = function(redis, secretToken) {
    let authModel = {};
    
    authModel.createToken = function(username, password, callback) {
        ...
        db.set(token, function(err) {
            ...
        });
    }
    
    authModel.checkToken = function(token, callback) {
        ...
        db.get(token, function(err, res) {
            ...
        });
    }

    return authModel;
}
```

#### Path: controllers/auth.js

```js
'use strict';

module.exports = function(authModel) {
    let authController = {};
    
    authController.createToken = function(req, res, next) {
        ...
        authModel.createToken(req.body.username, req.body.password, function(err, result) {
            ...
        });
    }
    
    authController.checkToken = function(req, res, next) {
        ...
        authModel.checkToken(req.query.token, function(err, res) {
            ...
        });
    }

    return authController;
}
```

#### Path: app.js

```js
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const diContainer = require('./libs/locator')();

diContainer.register('redisHost', '192.168.1.100');
diContainer.register('tokenSecret', 'SECRET:KEY123!');

diContainer.factory('redis', require('./clients/redis'));
diContainer.factory('authModel', require('./model/auth'));
diContainer.factory('authController', require('./controllers/auth'));

const authController = diContainer.get('authController');


app.post('/login', authController.createToken);
app.get('/check', authController.checkToken);

app.listen(3000);
```


### Conclusions

#### +++

 - We have an improved decoupling and testability
 - Pattern doesn't force the modules to depend on any extra service except its actual dependencies
 - Allows each module to be used even without the DI container, using a simple manual injection

#### ---

 - More complexity because our dependencies are resolved at runtime

