import React from 'react';
import PropTypes from 'prop-types';

const Pane = props => {
    console.log("Pane created");
    return (
        <div className="pane">
            {props.children}
        </div>)
}

Pane.propTypes = {
    name: PropTypes.string
}

export default Pane;