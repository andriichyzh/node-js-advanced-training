# Node.js Advanced Training

## Required

 - [JavaScript Base](requirements/javascript-base.md)
 - [JavaScript Advanced](requirements/javascript-advanced.md)
 - [Linux Base](requirements/linux-base.md)

## Program

### `JavaScript Refresh`

### `ECMAScript 2015 (ES6)`

 - **Block scoping**
   - let
   - const
   - function-in-blocks
 - **Collections**
   - Map
   - WeakMap
   - Set
   - WeakSet
 - **Clases**
 - **Typed arrays**
 - **Generators**
 - **Binary and Octal literals**
 - **Object literal extensions**
 - **Promises**
 - **Symbols**
 - **Template strings**
 - **Arrow Functions**

### `Node.js`

#### Philosophy

 - Small core
 - Small modules
 - Small surface area
 - Simplicity and pragmatism

#### Design Fundamentals

 - **Conceptions**
   - Event Loop
   - IO operations
   - Non blocking

 - **Components**
   - V8
   - libuv

#### Getting started on practice

 - Requirements
 - Installation Node.js (direct and NVM)
 - CLI commands
 - First script
 - Understanding of errors
 - Approaches and tools for debug
 
#### Loading system of modules and NPM

 - How it works?
 - Supported formats
 - Order of load and resolving algorithm
 - The module cache
 - NPM registry

#### Core modules

 - Console
 - Timers
 - Errors
 - Events
 - Stream
 - File System
 - HTTP
 - Crypto
 - Child Processes
 - ...

#### Useful NPM modules

 - Lodash
 - Async / Neo-async
 - WS
 - MongoDB
 - Redis
 - Postgres
 - ...

#### Build your own modules

 - File structure
 - Deep with package.json
 - Local packages
 - Publish to NPM Registry
 - Using in application
 - ...
 
#### Common Patterns in Node.js  

 - Callbacks
 - Error-first
 - ...

#### Design Patterns in Node.js

 - **Creational Design Patterns**
   - Singleton
   - Factory
   - Abstract Factory
   - ...
   
 - **Structural Design Patterns**
   - Adapter
   - Composite
   - Decorator
   - Facade
   - Bridge
   - Proxy
   - ...
 
 - **Behavioral Design Patterns**
   - Observer
   - ...
   
#### Asynchronous Control Flow

 - **The difficulties**
   - The callback hell

 - **Flows**
   - Sequential execution
   - Parallel execution
   - Limited parallel execution

 - **Solutions**
   - Pure JS functions
   - Async libraries
   - Promises
   - Generators

#### Wiring modules

 - Hardcoded dependency
 - Dependency injection
 - Service locator
 - Dependency injection container

#### Recipes for yours applications

 - Connection to MongoDB
 - Repository pattern
 - Run heavy CPU operations
 - ...

#### Testing in Node.js

 - What we test?
 - How to do your testing most effective and fast?
 - Approaches (eg TDD, BDD, etc)
 - Tools and libraries
 - Code Coverage
 - Best practices in testing
 - Continuous Integration (Travis CI)

#### Documentation

 - README Driven Development
 - REST API (RAML)
 - Tips and Tricks

#### The design and architecture of the application

 - MVC
 - DDD
 - SOA
 - Micro-services
 - ...
 
#### Projects: Common recommendations

 - **Configuration**
 - **Logging**
 - **Connection to DBs and external services**
 - ...

#### Project 1: Simple web-site

 - Express
 - Serving static content by Node.js
 - Using Nginx as reverse proxy and server of static content

#### Project 2: Service with REST API

 - Express
 - REST API design
 - REST API testing

#### Project 3: Tiny cloud (micro-services)

 - Micro-services overview
 - Communication between services
 - HTTP and Message Broker for communication
 - Testing of micro-services

#### Performance and Scaling of application and system

 - **Scaling**
   - What is scaling?
   - Scaling Law of applications
   - Methods of scaling applications

 - **Performance**
   - What is performance? 
   - What should we measure?
   - Tools for performance tests (Yandex.Tank, ab, siege)
   - Analysis of the results
   - Recommendations for scaling
 
 - **Cache in applications**

#### Profiling and optimizations of application and system

 - **Top most common mistakes**
 
 - **Profiling**
   - Memory
   - CPU
   - Blocking of EventLoop
 
 - **Tools**

#### Yours applications in production

 - Best practices of logging
 - Orchestration (Ansible)
 - ...

#### Docker is the best friend of your applications (overview)

 - What is Docker?
 - Create Docker image with your application
 - Run your applications
 - How run tiny cloud everywhere in 1 click (Docker Compose)
 - ...

#### Final test and questions


# License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](http://creativecommons.org/licenses/by-nc/4.0/legalcode).

[![Creative Commons Attribution-NonCommercial 4.0 International License](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc/4.0/legalcode)