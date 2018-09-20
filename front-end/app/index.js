import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import configureStore from 'store/configureStore';
import {App} from "containers";

import 'reset-css';

let store = configureStore({});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
