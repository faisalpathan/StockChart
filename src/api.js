import openSocket from 'socket.io-client';
const socket = openSocket('http://kaboom.rksv.net/watch');

function getStockDataFromSocket(cb) {
	socket.on('data', function(data) {
		console.info(data);
		socket.emit('CLIENT_ACKNOWLEDGEMENT', 1, data => {
			console.info('acknowlege', data);
		});
	});

	socket.on('connect', function() {
		socket.emit('ping', {});
		socket.emit('sub', {
			state: true,
		});
	});

	socket.on('error', function(data) {
		console.error(data);
	});
}

export { getStockDataFromSocket };
