var net = require('net');
var client = new net.Socket();
var RunScore = function(){};

//	Open(addr,port):Promise
//
//	Opens communication with RSServer
//
//	addr:String - IP address. Can be numeric or the name of the network node.
//	port:Int - TCP/IP port
//	Return:Bool - true on success

RunScore.prototype.Open = (addr,port) => {
	return new Promise((resolve,reject) => {
		client.connect(port, addr, ()=>resolve(true));
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	login(userid,password,version):Promise
//
//	Login to RSServer. If RSServer does not require a login, this function must still be used.
//	In that case, the userid and password will be zero-length strings.
//
//	version:String - Version of the RSClient
//	Return:Bool - true on success

RunScore.prototype.login = (userid,password,version) => {
	return new Promise((resolve,reject) => {
		client.write(`Hello|Version ${version}`);
		client.on('data',(data)=>{
			if(data.toString().includes('WARNING')){
				reject(Error('Version Mismatch: '+ data.toString()));
			}else if (data.toString().includes('LogonRequired')) {
				client.write(`Logon|${userid}|${password}|end`);
			}else {
				resolve(true);
			}
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	Close():Promise
//
//	Close the connection.
//
//	Return:Bool - true on success

RunScore.prototype.Close = () => {
	return new Promise((resolve,reject)=>{
		client.end();
		resolve(true);
	})
}

//	getN_bibs(event):Promise
//
//	Return the number of finishers in "event".
//
//	event:String - RunScore event name
//	Return:Int - Number of finishers in "event"

RunScore.prototype.getN_bibs = (event) => {
	return new Promise((resolve,reject)=>{
		client.write(`Results|${event}|getN_bibs`)
		client.on('data',(data)=>{
			resolve(data.readInt16LE());
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	getN_times(event):Promise
//
//	Return the number of times in "event".
//
//	event:String - RunScore event name
//	Return:Int - Number of times in "event"

RunScore.prototype.getN_times = (event) => {
	return new Promise((resolve,reject)=>{
		client.write(`Results|${event}|getN_times`)
		client.on('data',(data)=>{
			resolve(data.readInt16LE());
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	getN_records():Promise
//
//	Return the number of records in the database. Includes "deleted" records.
//
//	Return:Int - Number of records in the database. Includes "deleted" records.

RunScore.prototype.getN_records = () => {
	return new Promise((resolve,reject)=>{
		client.write(`GetN_records`)
		client.on('data',(data)=>{
			resolve(data.readInt16LE());
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	getN_competitors():Promise
//
//	Return the number of actual records in the database not including deleted ones.
//
//	Return:Int - Number of actual records in the database not including deleted ones.

RunScore.prototype.getN_competitors = () => {
	return new Promise((resolve,reject)=>{
		client.write(`GetN_competitors`)
		client.on('data',(data)=>{
			resolve(data.readInt16LE());
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	findBib(event,start,field,bib):Promise
//
//	Find where a runner with "bib" number has finished.
//
//	event:String - RunScore event name
//	start:Int - Start looking at this place
//	bib:String - Bib number. Must have the same number of characters as the field.
//	Return:Int - finish place

RunScore.prototype.findBib = (event,start,bib) => {
	return new Promise((resolve,reject)=>{
		client.write('GetBibFieldNo');
		var bibLoc = 0;
		client.on('data',(data)=>{
			if(bibLoc){
				resolve(data.readInt16LE());
			}else {
				bibLoc = data.readInt16LE();
				client.write(`Results|${event}|findBib|${start}|${bibLoc}|${bib}`);
			}
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	getBib(event,finishPlace):Promise
//
//	Get the bib number for a finisher.
//
//	event:String - RunScore event name
//	finishPlace:Int - Finish place.
//	Return:String - Bib number. Has the same number of characters as the field.

RunScore.prototype.getBib = (event,finishPlace) => {
	return new Promise((resolve,reject)=>{
		client.write(`Results|${event}|getBib|${finishPlace}`)
		client.on('data',(data)=>{
			resolve(data.toString());
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	getTime(event,finishPlace):Promise
//
//	Return the time for a finisher. Time is an integer in units of 0.01 seconds.
//
//	event:String - RunScore event name
//	finishPlace:Int - Finish place. Origin 1.
//	Return:Int - Time in units of centiseconds.

RunScore.prototype.getTime = (event,finishPlace) => {
	return new Promise((resolve,reject)=>{
		client.write(`Results|${event}|getTime|${finishPlace}`)
		client.on('data',(data)=>{
			resolve(data.readInt32LE());
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	getTimes(event,i1,i2,size):Promise
//
//	Return an array of times (integers in centiseconds)
//
//	event:String - RunScore event name
//	i1:Int - get times starting at place i1
//	i2:Int - get times finishing at place i2
//	Return:Array[Int] - Time in units of centiseconds.

RunScore.prototype.getTimes = (event,i1,i2) => {
	return new Promise((resolve,reject)=>{
		var times = []
		var i = i1;
		client.write(`Results|${event}|getTime|${i}`);
		client.on('data',(data)=>{
			times.push(data.readInt32LE());
			i++;
			client.write(`Results|${event}|getTime|${i}`);
			 if(times.length == i2){
			 	resolve(times);
			 }
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	getFins(event,i1,i2):Promise
//
//	Returns indices into database of all finishers
//
//	event:String - RunScore event name
//	i1:Int - get indicies starting at place i1
//	i2:Int - get indicies finishing at place i2
//	Return:Array[Int] - Indicies into database of all finishers

RunScore.prototype.getFins = (event,i1,i2) => {
	return new Promise((resolve,reject)=>{
		var indicies = []
		var i = i1;
		client.write(`Results|${event}|getFin|${i}`);
		client.on('data',(data)=>{
			indicies.push(data.readInt32LE());
			i++;
			client.write(`Results|${event}|getFin|${i}`);
			 if(indicies.length == i2){
			 	resolve(indicies);
			 }
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	getFin(event,i):Promise
//
//	Return index of finish.
//
//	event:String - RunScore event name
//	finishPlace:Int - Place of finisher
//	Return:Int - Index of finish

RunScore.prototype.getFin = (event,finishPlace) => {
	return new Promise((resolve,reject)=>{
		client.write(`Results|${event}|getFin|${finishPlace}`)
		client.on('data',(data)=>{
			resolve(data.readInt32LE());
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	getFieldLength(i):Promise
//
//	Returns length of field. NOTE: Only data fields return useful information. A label will return -1 for the length.
//
//	i:Int - Field number
//	Return:Int - Field length

RunScore.prototype.getFieldLength = (i) => {
	return new Promise((resolve,reject)=>{
		client.write(`GetFieldLength|${i}`)
		client.on('data',(data)=>{
			resolve(data.readInt16LE());
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	getFieldName(i):Promise
//
//	Returns name of field.
//
//	i:Int - Field number
//	Return:String - Field name

RunScore.prototype.getFieldName = (i) => {
	return new Promise((resolve,reject)=>{
		client.write(`GetFieldName|${i}`)
		client.on('data',(data)=>{
			resolve(data.toString());
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	readRecord(i):Promise
//
//	Returns record.
//
//	i:Int - record number. Origin 0.
//	Return:Record - Returns record as a Javascript object.

RunScore.prototype.readRecord = (i) => {
	return new Promise((resolve,reject)=>{
		var fields = 0;
		var Record = {};
		var recordString = 0;
		var fieldLength = 0;
		var fieldName = 0;
		var fieldNumber = 0;
		client.write('GetNoOfFields');
		client.on('data',(data)=>{
			if (fields) {
				if (recordString) {
					if(fieldLength){
						fieldName=data.toString();
						Record[fieldName] = recordString.slice(0,fieldLength).trim();
						recordString = recordString.slice(fieldLength);
						if (fieldNumber==fields) {
							resolve(Record);
						}
						fieldName = 0;
						fieldLength = 0;
						fieldNumber++;
						client.write(`GetFieldLength|${fieldNumber}`);
					}else {
						fieldLength=data.readInt16LE();
						if (fieldLength<0) {
							fieldLength=0;
							fieldNumber++;
							client.write(`GetFieldLength|${fieldNumber}`);
						}else {
							client.write(`GetFieldName|${fieldNumber}`);
						}
					}
				}else {
					recordString = data.toString();
					client.write(`GetFieldLength|${fieldNumber}`);
				}
			}else {
				fields = data.readInt16LE();
				client.write(`ReadRec|${i}`);
			}
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	Srch(fieldno,str,start,wrap):Promise
//
//	Ask the server to search the database for this text in this field.
//
//	fieldno:Int - Field number
//	srt:String - String to search for
//	start:Int - Index to start search at.
//	wrap:Bool - If true search to the end to the database. If still not found start over from beginning.
//	Return:Int - Returns record index (Origin 0), -2 if a problem, and -1 if not found.

RunScore.prototype.Srch = (fieldno,str,start,wrap) => {
	return new Promise((resolve,reject)=>{
		client.write(`Enter|Srch|${fieldno}|${start}|${str}|${wrap}`)
		client.on('data',(data)=>{
			resolve(data.toString().split('|')[1]);
		})
		client.on('error',(err)=>reject(Error(err)));
	})
}

module.exports = new RunScore();
