const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser')
require('./hbs/helpers');

// Configuration
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let server = http.createServer(app);
app.set('port', process.env.PORT || 3000);

// Middleware
app.use( express.static(path.resolve(__dirname, 'public')) );

// HBS
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials( path.join(__dirname,'views','partials') );
app.set('view engine', 'hbs');

// IO
module.exports.io = socketIO(server);
require('./sockets/socket');

// Routes
app.use( require('./routes/routes') );

// Server
server.listen(app.get('port'), (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ app.get('port') }`);
});