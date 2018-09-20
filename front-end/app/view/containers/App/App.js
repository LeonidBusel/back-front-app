import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import {MainPage} from 'containers';

import './app.less';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div className='app'>
                    <Switch>
                        <Route exact path='/'
                               render={() => <MainPage/>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}