import React, {Component} from "react";
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';

import './toDoControl.less';

class ToDoControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemTitle: props.value
        }
    }

    handleChange = ({target}) => {
        this.setState({
            itemTitle: target.value || ''
        });
    };

    componentWillReceiveProps(nextProps, nextState) {
        if(JSON.stringify(nextProps.value) !== JSON.stringify(this.state.itemTitle)) {
            this.setState({
                itemTitle: nextProps.value
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }


    render() {
        const {title, onClick, buttonTitle} = this.props;

        return (
            <div className="wrapper-control">
                <label htmlFor="new-item">{title}:&nbsp;
                    <input id="new-item" type="text" value={this.state.itemTitle} onChange={this.handleChange}/>
                </label>&nbsp;
                <button className="button" onClick={() => onClick(this.state.itemTitle)}>{buttonTitle}</button>
            </div>
        )
    }
}

ToDoControl.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string.isRequired
};

export default ToDoControl;