const { io } = require('../server');
const { Users } = require('../models/users');
const { createMessage } = require('../utilities/utilities');

const users = new Users();

io.on('connection', (socket) => {

	socket.on('joinChat', (user, callback) =>{

		if( !user.name || !user.room ){
			return callback({
				error: true,
				message: 'el nombre/sala es necesario'
			})
		}

		socket.join(user.room);
		
		users.addUser( socket.id, user.name, user.room );

		socket.broadcast.to(user.room).emit('userList', users.getUserByRoom( user.room ) );

		return callback( users.getUserByRoom( user.room ) );

	});

	socket.on('enviarMensaje', (data)=>{
		const user = users.getUserById( socket.id );
		const message = createMessage(user.name, data.message);
		socket.broadcast.to(user.room).emit('enviarMensaje', message);
	});

	socket.on('disconnect', function(){
		const user = users.removeUser( socket.id );
		socket.broadcast.to(user.room).emit('userDisconnect', createMessage('Admin', `${user.name} salio del chat`) );
		socket.broadcast.to(user.room).emit('userList', users.getUserByRoom( user.room ) );
	});

	socket.on('privateMessage', ({ message, from }) => {
		const user = users.getUserById( socket.id );
		socket.broadcast.to( from ).emit('privateMessage', createMessage( user.name, message ) );
	})

});