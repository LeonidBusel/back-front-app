const WebSocket = require('ws');

let store = require('./Store');


class WebSocketServer {
    constructor(config) {
        this.wss = new WebSocket.Server({host: config.host, port: config.port, backlog: config.backlog});
        this.clients = [];
    }

    sendListToAll() {
        this.wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                console.log("send msg");
                client.send(JSON.stringify({list: store.list || [], type: "GET_LIST", lastUpdate: store.lastUpdate}));
            }
        });
    }


    handleWebSocket() {
        let _self = this;

        this.wss.on('connection', function (ws) {
            console.log("somebody connect...");

            ws.on('message', function (message) {
                console.log('received: %s', message);

                const msg = JSON.parse(message);

                switch (msg.type) {
                    case 'GET_LIST':
                        ws.send(JSON.stringify({
                            list: store.list || [],
                            type: "GET_LIST",
                            lastUpdate: store.lastUpdate
                        }));
                        break;
                    case 'UPDATE_LIST':
                        if (store.lastUpdate < msg.data.lastUpdate) {
                            store.lastUpdate = msg.data.lastUpdate;
                            store.list = msg.data.list;
                        }

                        _self.sendListToAll();
                        break;
                    default:
                        ws.send(JSON.stringify({type: "ERROR", msg: "unknown message type"}));
                        break;
                }
            });

            ws.on('close', function (msg) {
                console.log("some connection close...");
            })
        })
    }
}

module.exports = WebSocketServer;

