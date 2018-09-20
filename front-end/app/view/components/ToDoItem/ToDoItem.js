import React, {Component} from "react";
import { findDOMNode } from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
        console.log("edit item");
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
        console.log(`begin drag:`);
        console.log(props);
        return {
            index: props.index,
            id: props.id,
            title: props.title
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult && dropResult.id !== item.id) {
            console.log(`end drag, dropResultId: ${dropResult.id}, item.id: ${item.id}`);
            // props.removeCard(item.index);
        }
    }
};

const itemTarget = {

    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveItem(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex;
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...toDoListActions
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(DropTarget("item", itemTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(DragSource("item", itemSource, collect)(ToDoItem)));