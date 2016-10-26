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

}

//	getN_times(event):Promise
//
//	Return the number of times in "event".
//
//	event:String - RunScore event name
//	Return:Int - Number of times in "event"

RunScore.prototype.getN_times = (event) => {

}

//	getN_records():Promise
//
//	Return the number of records in the database. Includes "deleted" records.
//
//	Return:Int - Number of records in the database. Includes "deleted" records.

RunScore.prototype.getN_records = () => {

}

//	getN_competitors():Promise
//
//	Return the number of actual records in the database not including deleted ones.
//
//	Return:Int - Number of actual records in the database not including deleted ones.

RunScore.prototype.getN_competitors = () => {

}

//	findBib(event,start,field,bib):Promise
//
//	Find where a runner with "bib" number has finished.
//
//	event:String - RunScore event name
//	start:Int - Start looking at this place
//	field:Int - Which search field do you want to look in. Bib number is usually field 3. Field 1 is general information, field 2 is typically "NO.".
//	bib:String - Bib number. Must have the same number of characters as the field.
//	Return:Int - finish place

RunScore.prototype.findBib = (event,start,field,bib) => {

}

//	getBib(event,finishPlace):Promise
//
//	Get the bib number for a finisher.
//
//	event:String - RunScore event name
//	finishPlace:Int - Finish place.
//	Return:String - Bib number. Has the same number of characters as the field.

RunScore.prototype.getBib = (event,finishPlace) => {

}

//	getTime(event,finishPlace):Promise
//
//	Return the time for a finisher. Time is an integer in units of 0.01 seconds.
//
//	event:String - RunScore event name
//	finishPlace:Int - Finish place. Origin 1.
//	Return:Int - Time in units of 0.01 seconds.

RunScore.prototype.getTime = (event,finishPlace) => {

}

//	getTimes(event,i1,i2,size):Promise
//
//	Return an array of times (integers in 0.01s)
//
//	event:String - RunScore event name
//	i1:Int - get times starting at place i1
//	i2:Int - get times finishing at place i2-1
//	size:Int - Expected number of finishers
//	Return:Array[Int] - Time in units of 0.01 seconds.

RunScore.prototype.getTimes = (event,i1,i2,size) => {

}

//	getFins(event,i1,i2,size):Promise
//
//	Returns indices into database of all finishers
//
//	event:String - RunScore event name
//	i1:Int - get indicies starting at place i1
//	i2:Int - get indicies finishing at place i2-1
//	size:Int - Expected number of finishers
//	Return:Array[Int] - Indicies into database of all finishers

RunScore.prototype.getFins = (event,i1,i2,size) => {

}

//	getFin(event,i):Promise
//
//	Return index of finish.
//
//	event:String - RunScore event name
//	i:Int - Place of finisher
//	Return:Int - Index of finish

RunScore.prototype.getFin = (event,i) => {

}

//	getFieldLength(i):Promise
//
//	Returns length of field. NOTE: Only data fields return useful information. A label will return -1 for the length.
//
//	i:Int - Field number
//	Return:Int - Field length

RunScore.prototype.getFieldLength = (i) => {

}

//	getFieldName(i):Promise
//
//	Returns name of field.
//
//	i:Int - Field number
//	Return:Int - Field name

RunScore.prototype.getFieldName = (i) => {

}

//	readRecord(i):Promise
//
//	Returns record.
//
//	i:Int - record number. Origin 0.
//	Return:Record - Returns record as a Javascript object.

RunScore.prototype.readRecord = (i) => {

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

}

module.exports = new RunScore();
