var socket = io();

var params = new URLSearchParams(window.location.search);

if( !params.has('name')){
	window.location = "/";
	throw new Error('El nombre es necesario');
}

var name = params.get('name');
var room = params.get('room');

var user = {
	name,
	room
}


socket.on('connect', function() {
    
	socket.emit('joinChat', user, function( users ){
		console.log( 'ActiveUsers', users );
	});

});

socket.on('userDisconnect', function( resp ) {
	console.log( 'userDisconnect', resp.message );    
});

socket.on('userList', function( users ){
	console.log('userList', users );
});

// Escuchar información
socket.on('enviarMensaje', function( message ) {
    console.log('Servidor:', message);
});

socket.on('privateMessage', function( message ) {
	console.log('privateMessage', message );
})