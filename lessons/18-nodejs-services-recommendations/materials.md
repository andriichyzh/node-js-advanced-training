# Services Recommendations

## Configuration

 - Store config in the environment 
 - Use environment variables if it possible
 - Set default values of config parameters
 - Use validation for config parameters
 - Write detailed documentation
 - Keep in mind the possible need of reloading config “on the fly”

## Logging

 - Write logs to `STDOUT`
 - Add component names for different parts of service
 - Set correct log levels (`INFO`, `WARN`, `ERROR` etc) for messages
 - Set common log level by environment variable
 - Use `correlationId` for all way of request
 - Not save to log messages tokens and private information of users
 
## Monitoring and Profiling

 - Add business metrics for checking real needs
 - Very useful `monitoring` metrics:
   - Avg input load, RPS
   - Load Avg
   - RAM for process, MB
   - System memory, MB 
   - Blocking of event loop, ms
   - Events of disconnect/reconnect of DB / external services
   - Services without input load
   - Total error count
 - Very useful `profiling` metrics:
   - Slow API operations (time > SLA)
   - Response time of operations

## Database / Cache

 - The code for services makes no distinction between local and remote databases or caches
 - Try use most lightware patterns for work with DB (eg Repository [link](https://habrahabr.ru/post/248505/) [link](http://code.tutsplus.com/tutorials/the-repository-design-pattern--net-35804))
 - Handle “disconnect” events and set “isDisconnected” flag
 - Reduce use of `sync` initialization of clients of databases and caches
 - Always check request’s performance and using indexes (#explain() in MongoDB)
 - Use if it possible full shard key (or fallback with different shard keys)
 - Be careful with `readPreference` (can be eventual consistency)
 - Use migration instead custom scripts ([db-migrate](https://github.com/db-migrate/node-db-migrate) [migrate](https://github.com/tj/node-migrate))
 - If it possible use cache for rapidly changing and not critical data
 - Create indexes only from migration tool (not from service code)

## External Services

 - The code for services makes no distinction between local and third party services
 - Try use most lightware patterns for work with external services (eg Repository)
 - Handle “disconnect” events and set “isDisconnected” flag
 - Use retry for connections and requests to external services (retry time with `exponential backoff`, see [link](https://www.npmjs.com/package/retry))
 - Reduce use of async initialization of clients of external services

## Domain Logic

 - Try design domain logic of service by Domain-Driven Design (DDD) ([link](https://habrahabr.ru/post/61524/))
 - Experiment and look for the best solution 
 - Isolate the domain from the model

## Interfaces / API

 - Always use limits and pagination in API
 - Handle “isDisconnected” flag and return to clients 500 Internal Server Errors
 - Use single schema (eg `JSON Schema`) for validation input parameters in requests and generating public documentation
 - Return detailed messages in case validation error
 - Check backward and forward compatible

## Infrastructure

 - Handle SIGTERM as “graceful stop” of service with success finishing of all current operations
 - Maximize robustness with fast startup (eg parallel initialization of resources)
 - Build maximum stateless services
 - Use queues for background tasks


## Scaling

 - Scale out via the process model
 - Better have a lots of little processes which are handling specific needs (microservices pattern)

Details: https://docs.google.com/presentation/d/1DE3E3wN-oxaDQxXL152LXISv5qTRMni2aJUmhSWB-KQ/edit?usp=sharing