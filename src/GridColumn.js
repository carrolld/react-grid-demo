import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

class GridColumn extends Component {
    render() {
        return <div
            role="columnheader"
            className="sortable"
            onClick={this.props.click}
            data-index={this.props.index}
            data-name={this.props.name}
            data-sort={this.props.sort}
        >
            {this.props.label}
            
            {this.props.sort === false ? <FontAwesomeIcon icon={faSort} /> : ''}
            {this.props.sort === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : ''}
            {this.props.sort === 'desc' ? <FontAwesomeIcon icon={faSortDown} /> : ''}
        </div>;
    }
}

export default GridColumn;