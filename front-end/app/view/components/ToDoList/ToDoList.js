import React, {Component} from "react";
import shallowCompare from 'react-addons-shallow-compare';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ToDoItem} from 'components';
import * as toDoListActions from 'actions/toDoListActions';

import './toDoList.less';

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list
        }
    }

    moveItem = (dragIndex, hoverIndex) => {
        let arr = this.state.list.slice(),
        item = arr[dragIndex];
        arr.splice(dragIndex, 1);
        arr.splice(hoverIndex, 0, item);

        this.setState({
            list: arr
        })
    };

    componentWillReceiveProps(nextProps, nextState) {
        if(JSON.stringify(nextProps.list) !== JSON.stringify(this.state.list)) {
            this.setState({
                list: nextProps.list
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }


    render() {
       // const {list = []} = this.props;
        const items = this.state.list.map((item, i) => {
            return <ToDoItem key={item.id} index={i} id={item.id} title={item.title} done={item.done} moveItem={this.moveItem}/>
        });

        return (
            <div className="wrapper-list">
                {items}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list: state.toDoListReducer.list
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...toDoListActions
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);