import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class Spinner extends Component {
    render() {
        return <div
            className={`spinner ${this.props.shown ? 'visible' : 'hidden'}`}
        >
            <FontAwesomeIcon icon={faSpinner} pulse />
        </div>;
    }
};

export default Spinner;