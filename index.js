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

module.exports = new RunScore();
