import React, {Component} from "react";
import PropTypes from 'prop-types';

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
            itemTitle: target.value
        });
    };


    render() {
        const {title, value, onClick, buttonTitle} = this.props;

        return (
            <div className="wrapper-control">
                <label htmlFor="new-item">{title}:&nbsp;
                    <input id="new-item" type="text" defaultValue={value} onChange={this.handleChange}/>
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