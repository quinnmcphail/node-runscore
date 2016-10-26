var net = require('net');
var client = new net.Socket();
var RunScore = function(){};

//	Promise Open(addr,port)
//
//	Opens communication with RSServer
//
//	String addr: IP address. Can be numeric or the name of the network node
//	Int port: TCP/IP port
//	Return: true on success

RunScore.prototype.Open = (addr,port) => {
	return new Promise((resolve,reject) => {
		client.connect(port, addr, ()=>resolve(true));
		client.on('error',(err)=>reject(Error(err)));
	})
}

//	Promise login(userid,password,version)
//
//	Login to RSServer. If RSServer does not require a login, this function must still be used.
//	In that case, the userid and password will be zero-length strings.
//
//
//
//	Return: true on success

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

//	Promise Close()
//
//	Close the connection.
//
//	Return: true on success

RunScore.prototype.Close = () => {
	return new Promise((resolve,reject)=>{
		client.end();
		resolve(true);
	})
}

// client.on('data', function(data) {
//   results.push(data)
//   if (data == 'Entries') {
//     client.write('GetN_competitors');
//   }else {
//     console.log(data.readInt16LE());
//   }
// });
//
// client.on('close', function() {
// 	console.log('Connection closed');
// });
module.exports = new RunScore();
