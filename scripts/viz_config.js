var socket = new WebSocket("wss://testnet.viz.world");
socket.onerror = function (err){
	viz.config.set('websocket', 'wss://ws.viz.ropox.tools');
	console.log(err);
};