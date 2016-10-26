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

### getN_bibs(event):Promise
Return the number of finishers in "event".

	event:String - RunScore event name
	Return:Int - Number of finishers in "event"
Example:
```javascript
Coming Soon.
```

### getN_times(event):Promise
Return the number of times in "event".

	event:String - RunScore event name
	Return:Int - Number of times in "event"
Example:
```javascript
Coming Soon.
```

### getN_records():Promise
Return the number of records in the database. Includes "deleted" records.

	Return:Int - Number of records in the database. Includes "deleted" records.
Example:
```javascript
Coming Soon.
```

### getN_competitors():Promise
Return the number of actual records in the database not including deleted ones.

	Return:Int - Number of actual records in the database not including deleted ones.
Example:
```javascript
Coming Soon.
```

### findBib(event,start,field,bib):Promise
Find where a runner with "bib" number has finished.

	event:String - RunScore event name
	start:Int - Start looking at this place
	field:Int - Which search field do you want to look in. Bib number is usually field 3. Field 1 is general information, field 2 is typically "NO.".
	bib:String - Bib number. Must have the same number of characters as the field.
	Return:Int - finish place
Example:
```javascript
Coming Soon.
```

### getBib(event,finishPlace):Promise
Get the bib number for a finisher.

	event:String - RunScore event name
	finishPlace:Int - Finish place.
	Return:String - Bib number. Has the same number of characters as the field.
Example:
```javascript
Coming Soon.
```

### getTime(event,finishPlace):Promise
Return the time for a finisher. Time is an integer in units of 0.01 seconds.

	event:String - RunScore event name
	finishPlace:Int - Finish place. Origin 1.
	Return:Int - Time in units of 0.01 seconds.
Example:
```javascript
Coming Soon.
```

### getTimes(event,i1,i2,size):Promise
Return an array of times (integers in 0.01s)

	event:String - RunScore event name
	i1:Int - get times starting at place i1
	i2:Int - get times finishing at place i2-1
	size:Int - Expected number of finishers
	Return:Array[Int] - Time in units of 0.01 seconds.
Example:
```javascript
Coming Soon.
```

### getFins(event,i1,i2,size):Promise
Returns indices into database of all finishers

	event:String - RunScore event name
	i1:Int - get indicies starting at place i1
	i2:Int - get indicies finishing at place i2-1
	size:Int - Expected number of finishers
	Return:Array[Int] - Indicies into database of all finishers
Example:
```javascript
Coming Soon.
```

### getFin(event,i):Promise
Return index of finish.

	event:String - RunScore event name
	i:Int - Place of finisher
	Return:Int - Index of finish
Example:
```javascript
Coming Soon.
```

### getFieldLength(i):Promise
Returns length of field. NOTE: Only data fields return useful information. A label will return -1 for the length.

	i:Int - Field number
	Return:Int - Field length
Example:
```javascript
Coming Soon.
```

### getFieldName(i):Promise
Returns name of field.

	i:Int - Field number
	Return:String - Field name
Example:
```javascript
Coming Soon.
```

### readRecord(i):Promise
Returns record.

	i:Int - record number. Origin 0.
	Return:Record - Returns record as a Javascript object.
Example:
```javascript
Coming Soon.
```

### Srch(fieldno,str,start,wrap):Promise
Ask the server to search the database for this text in this field.

	fieldno:Int - Field number
	srt:String - String to search for
	start:Int - Index to start search at.
	wrap:Bool - If true search to the end to the database. If still not found start over from beginning.
	Return:Int - Returns record index (Origin 0), -2 if a problem, and -1 if not found.
Example:
```javascript
Coming Soon.
```
