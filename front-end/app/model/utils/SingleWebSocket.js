import * as toDoListActions from 'actions/toDoListActions'
import config from 'config';

let instance;
export default class SingleWebSocket {
    constructor(store) {
        if (instance) {
            return instance;
        }

        this.store = store;
        this.ws = null;
        instance = this;
    }

    createConnection() {
        this.ws = new WebSocket(config.webSocketUrl);
        this.handleSocket();
    }

    handleSocket() {
        this.ws.onopen = () => {
            console.log('websocket is connected ...');

            if (this.store.getState().toDoListReducer.needSync)
                this.store.dispatch(toDoListActions.syncList());
            else
                this.ws.send(JSON.stringify({type: 'GET_LIST'}));

        };

        this.ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            switch (data.type) {
                case 'GET_LIST':
                    if (this.store.getState().toDoListReducer.lastUpdate > data.lastUpdate) {
                        console.log("not actual data from server, cancel...");
                        break;
                    }

                    this.store.dispatch(toDoListActions.getList({list: data.list, lastUpdate: data.lastUpdate}));
                    break;
                default:
                    break;
            }
        };

        this.ws.onerror = (error) => {
            console.log("socket error");
        };

        this.ws.onclose = () => {
            console.log("socket is close");
            this.store.dispatch(toDoListActions.needSyncList());

            setTimeout(() => {
                this.createConnection();
            }, 3000);
        };
    }
};

