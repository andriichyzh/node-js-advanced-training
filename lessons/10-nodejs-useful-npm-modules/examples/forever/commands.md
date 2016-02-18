## Start

```bash
forever start lessons/10-nodejs-useful-npm-modules/examples/forever/server.js
```

## Start with future graceful exit

```bash
forever --killSignal=SIGTERM start lessons/10-nodejs-useful-npm-modules/examples/forever/graceful-exit.js
```
