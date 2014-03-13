var io = require('socket.io').listen(3000);

var games = {};

io.sockets.on('connection', function (socket) {
  socket.on('subscribe', function (data) {
  	if(data.room in games)
  	{
  		if(games[data.room]['count'] >=2)
  			games[data.room] = {count: 0, tiles: [], started: false};
  		else
  		{
  			games[data.room]['count']++;
  			games[data.room]['o'] = socket;
  		}
  	}
  	else
  	{
  		games[data.room] = {count: 0, tiles: [], started: false};

  		
  	}
  		socket.set('room', data.room);
    	socket.join(data.room);
    	console.log(games[data.room]['count']);
    	//socket.emit('move', {move:1});
  });

  socket.on('move', function (data){
  	socket.get('room', function(err, room){
  		socket.broadcast.to(room).emit('move', data);
  	});
  });


  socket.on('tile', function (data){
  	console.log(games);
   	socket.get('room', function(err, room){
   		if(games[room]['count']==0)
   		{
   			console.log(data);
   			games[room]['tiles'].push(data);
   		}
   		else if(games[room]['count']==1)
   		{	
   			console.log(games[room]['count']);
   			games[room]['count']++;
   			console.log('sending!');
   			for (var i = games[room]['tiles'].length - 1; i >= 0; i--) {
   				console.log(games[room]['tiles'][i]);
   				games[room]['o'].emit('itile',games[room]['tiles'][i]);
   			};
   		}


  		socket.broadcast.to(room).emit('tile', data);
  	});
  });

  
});