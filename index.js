var net = require('net');

var client = new net.Socket();
client.connect(56789, '10.0.1.60', function() {
	console.log('Connected');
	client.write('Hello|Version 8.2.3.0');
});
var results = [];
client.on('data', function(data) {
  results.push(data)
  if (data == 'Entries') {
    client.write('GetN_competitors');
  }else {
    console.log(data.readInt16LE());
  }
});

client.on('close', function() {
	console.log('Connection closed');
});
