import React, {Component} from 'react';

class GridColumn extends Component {
    render() {
        return <div
            role="gridcell"
            className={this.props.row % 2 === 0 ? "even" : "odd" }
            data-row={this.props.row}
            data-column={this.props.column}
        >
            <div className="label" role="columnheader">{this.props.label}</div>
            {this.props.content}
            {this.props.children}
        </div>;
    }
}

export default GridColumn;