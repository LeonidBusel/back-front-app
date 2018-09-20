import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, compose} from 'redux';
import rootSagas from 'sagas';
import SingleWebSocket from 'utils/SingleWebSocket';
import reducers from 'reducers';

export default function configureStore(initialState = {}) {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [
        sagaMiddleware
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    let store = createStore(reducers , initialState, compose(...enhancers));

    const socket = new SingleWebSocket(store);
    socket.createConnection();

    sagaMiddleware.run(rootSagas);



    return store;
}