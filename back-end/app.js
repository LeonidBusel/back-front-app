const bodyParser = require('body-parser');
const express = require('express');
const HttpServer = require('./app/HttpServer');
const WebSocketServer = require('./app/WebSocketServer');
const config = require('./config');

let app = express();
app.use(bodyParser.json({type: 'application/*+json'}));
app.use(bodyParser.urlencoded({extended: true}));

/*let httpServer = new HttpServer(app, config['http-server']);

httpServer.createServer();
httpServer.clientRoutes();*/

let wsServer = new WebSocketServer(config['ws-server']);
wsServer.handleWebSocket();