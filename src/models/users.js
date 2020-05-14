class Users {
	constructor(id, name, room){
		this.id = id;
		this.name = name; 
		this.room = room;

		this.users = [];
	}

	addUser(id, name, room){

		const user = { id, name, room };

		this.users.push( user );

	}

	getUserById( id ){
		return this.users.find( user => user.id === id );
	}

	getUsers(){
		return this.users;
	}

	getUserByRoom( room ){
		return this.users.filter( user => user.room === room );
	}

	removeUser( id ){
		const user = this.getUserById( id );

		if( user ){
			this.users = this.users.filter( user => user.id != id );
		}

		return user;

	}
}

module.exports = {
	Users
};