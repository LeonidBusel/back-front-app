import React, {Component} from "react";
import { findDOMNode } from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as toDoListActions from 'actions/toDoListActions';
import {ToDoControl} from 'components';

import './toDoItem.less';


class ToDoItem extends Component {
    constructor(props) {
        super(props);
    }

    editItem = (itemTitle) => {
        if (itemTitle === this.props.title) return;

        const {editItem, index} = this.props;
        editItem({title: itemTitle, index: index});
    };

    removeItem = () => {
        const {removeItem, index} = this.props;
        removeItem({index: index});
    };

    changeStatus = () => {
        const {changeStatus, index} = this.props;
        changeStatus({index: index});
    };

    render() {
        const {connectDragSource, connectDropTarget, title, done} = this.props;

        return connectDragSource(connectDropTarget(
            <div className={`wrapper-item${done ? ' done' : ''}`}>
                <div className="col">
                    <div className="title">{title}</div>
                    <div className="wrapper-button">
                        <button className="button button-done" onClick={this.changeStatus}>done</button>
                        &nbsp;
                        <button className="button" onClick={this.removeItem}>remove</button>
                    </div>
                </div>
                <div className="col">
                    <ToDoControl title="Edit Title" value={title} buttonTitle="edit"
                                 onClick={this.editItem}/>
                </div>
            </div>
        ))
    }
}


const itemSource = {
    beginDrag(props) {
        return {
            index: props.index,
            id: props.id,
            title: props.title
        };
    },

    endDrag(props) {
        props.sortListUpdate(); //обновляем измененный список в store и на сервере
    }
};

const itemTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
            return;
        }

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        const clientOffset = monitor.getClientOffset();

        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        props.moveItem(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex;
    }
};

function collectSource(connect) {
    return {
        connectDragSource: connect.dragSource()
    };
}

function collectTarget(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...toDoListActions
    }, dispatch);
}

ToDoItem.propTypes = {
    list: PropTypes.array,
    editItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    changeStatus: PropTypes.func.isRequired,
    moveItem: PropTypes.func.isRequired,
    sortListUpdate: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool,
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(DropTarget("item", itemTarget, collectTarget)(DragSource("item", itemSource, collectSource)(ToDoItem)));