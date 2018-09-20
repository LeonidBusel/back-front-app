const http = require('http');
let store = require('./Store');


class HttpServer {
    constructor(app, config) {
        this.app = app;
        this.config = config;
    }

    createServer() {
        let _self = this;
        let server = http.createServer(_self.app);

        server.listen(_self.config.port, _self.config.host, _self.config.backlog, function () {
            console.log(`http-server created, host: ${_self.config.host}, port: ${_self.config.port}, backlog: ${_self.config.backlog}`);
        });
    }

    clientRoutes() {
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.app.get('/getList', function (req, res) {
            return res.json(store.list);
        })
    }
}

module.exports = HttpServer;

