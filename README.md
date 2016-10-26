# node-runscore
[![Build Status](https://travis-ci.org/quinnmcphail/node-runscore.svg?branch=master)](https://travis-ci.org/quinnmcphail/node-runscore)

Node module copy of RunScore C++/C# API.

## Install
	npm install node-runscore
## Usage
```javascript
var RSClient = require('node-runscore');
```
## Functions
### Promise:Open(addr,port)
Opens communication with RSServer.

    String:addr - IP address. Can be numeric or the name of the network node.
    Int:port - TCP/IP port
    Return - true on success
Example:
```javascript
var RSClient = require('node-runscore');

RSClient.Open('127.0.0.1',56789).then(function(result){
    if(result)
        console.log('Connected!');
}).catch(function(err){
    console.log(err);
});
```
### Promise:login(userid,password,version)
Login to RSServer. If RSServer does not require a login, this function must still be used. In that case, the userid and password will be zero-length strings.

    String:version - Version of the RSClient
    Return - true on success
Example:
```javascript
var RSClient = require('node-runscore');

RSClient.login('','','8.2.3.0');.then(function(result){
    console.log(result);
}).catch(function(err){
    console.log(err);
});
```

### Promise:Close()
Close the connection.

    Return - true on success
Example:
```javascript
var RSClient = require('node-runscore');

RSClient.Close().then(function(result){
    console.log(result);
}).catch(function(err){
    console.log(err);
});
```
