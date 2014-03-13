// Wait till the browser is ready to render the game (avoids glitches)

var socket = io.connect('http://192.168.0.3:3000');


window.requestAnimationFrame(function () {
  
});

function start(room){
	socket.emit('subscribe', {room: room});

  	new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager,0, socket);
  	new GameManager(4, OnlineKeyboardInputManager, HTMLActuator, LocalScoreManager,1, socket);
}