# node-deployit

## Work is in progress!

### usage

```npm install --save-dev git+https://git@github.com/flynetworks/node-deployit.git```

```javascript
new DeployIt({
    srcDir: '/my/src/dir', // optional (default: node cwd) 
    targetDir: '/home/apache/www/',
    ssh: {
        hostName: "example.com",
        userName: "foo",
        password: "bar", // optional
        port: 22 // optional (default: 22)
    },
    rsync: { // optional
        exclude: ['node_modules'], // string|string[] optional (default [node_modules]
        shell: 'ssh', // optional (default: ssh)
        flags: 'az', // optional (default: az)
        destination: 'foo@example.com:/home/apache/www/' // optional (default depends on the targetDir and the ssh settings)
    }
}).rsync();
```