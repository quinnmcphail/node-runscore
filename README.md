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
### Open(addr,port):Promise
Opens communication with RSServer.

	addr:String - IP address. Can be numeric or the name of the network node.
  port:Int - TCP/IP port
  Return:Bool - true on success
Example:
```javascript
var RSClient = require('node-runscore');

RSClient.Open('127.0.0.1',56789).then(function(result){
    if(result){
			console.log('Connected!');
		}
}).catch(function(err){
    console.log(err);
});
```
### login(userid,password,version):Promise
Login to RSServer. If RSServer does not require a login, this function must still be used. In that case, the userid and password will be zero-length strings.

	userid:String - userid for RSServer
	password:String - password for RSServer
	version:String - Version of the RSClient
	Return:Bool - true on success
Example:
```javascript
var RSClient = require('node-runscore');

RSClient.login('','','8.2.3.0');.then(function(result){
    console.log(result);
}).catch(function(err){
    console.log(err);
});
```

### Close():Promise
Close the connection.

	Return:Bool - true on success
Example:
```javascript
var RSClient = require('node-runscore');

RSClient.Close().then(function(result){
    console.log(result);
}).catch(function(err){
    console.log(err);
});
```
