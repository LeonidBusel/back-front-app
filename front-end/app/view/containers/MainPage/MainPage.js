import React, {Component} from "react";
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ToDoList, ToDoControl} from "components";
import * as toDoListActions from 'actions/toDoListActions';

import './mainPage.less';


class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    addItem = (itemTitle) => {
        const {addItem} = this.props;
        addItem({title: itemTitle || 'unknown', done: false});

    };

    render() {
        return (
            <div className="wrapper-main-page">
                <ToDoControl title="Add New Item, Title" buttonTitle="add" onClick={this.addItem}/>
                <ToDoList/>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...toDoListActions
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(DragDropContext(HTML5Backend)(MainPage));