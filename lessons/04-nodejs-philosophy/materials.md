# Node.js

`Node.js` is a JavaScript runtime built on `Chrome's V8 JavaScript` engine. 
`Node.js` uses an `event-driven`, `non-blocking I/O model` that makes it lightweight and efficient. 
`Node.js` package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

# Node.js Philosophy

## Small core

The Node.js core should be kept as small as possible.
The ecosystem of modules living outside the core.

## Small modules

**Don't Repeat Yourself (DRY)**

In Node.js, one of the most evangelized principles is to `design small modules`, not only in terms of `code size`, but most importantly in terms of `scope`. 

Small module is also considered to be the following:
 
 - Easier to understand and use
 - Simpler to test and maintain
 - Perfect to share with the browser

## Small surface area

Node.js modules usually have the characteristic of exposing only a minimal set of functionality.

## Simplicity and pragmatism

**Keep It Simple, Stupid (KISS)**

> "The design must be simple, both in implementation and interface. 
> It is more important for the implementation to be simple than the interface. 
> Simplicity is the most important consideration in a design." 
> (c) Richard P. Gabriel
     
# Principles from Isaac Z. Schlueter ([source](http://blog.izs.me/post/48281998870/unix-philosophy-and-nodejs))    
     
 - Write modules that `do one thing well`. Write a `new module` rather than `complicate an old one`.
 - Write modules that `encourage composition` rather than `extension`.
 - Write modules that handle data `Streams`, because that is the `universal interface`.
 - Write modules that are `agnostic` about the `source of their input` or the `destination of their output`.
 - Write modules that `solve a problem you know`, so you can learn about the ones you don’t.
 - Write modules that are `small`. Iterate `quickly`. Refactor `ruthlessly`. Rewrite `bravely`.
 - Write modules `quickly`, to meet your needs, with just a `few tests for compliance`. Avoid extensive specifications. Add a `test for each bug you fix`.
 - Write modules `for publication`, even if you `only use them privately`. You will `appreciate documentation in the future`.
 - `Working` is better than `perfect`.
 - `Focus` is better than `features`.
 - `Compatibility` is better than `purity`.
 - `Simplicity` is better than `anything`.
