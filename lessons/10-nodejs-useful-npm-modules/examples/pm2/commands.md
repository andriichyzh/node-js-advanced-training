## Start one

```bash
pm2 start lessons/10-nodejs-useful-npm-modules/examples/pm2/server.js
```

## Start 4 instances

```bash
pm2 start lessons/10-nodejs-useful-npm-modules/examples/pm2/server.js -i 4
```

## Monit

```bash
pm2 monit
```

## Check 

```bash
curl 127.0.0.1:3000
```

## Load AB

```bash
ab -k -n 100000 -c 100 http://127.0.0.1:3000/
```

## Load Siege

```bash
siege -t30s -c 100 -b http://127.0.0.1:3000/
```
