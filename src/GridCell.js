import React, {Component} from 'react';

class GridColumn extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         index: props.index,
    //         label: props.label,
    //         row: props.row,
    //     };
    // }

    // componentWillReceiveProps(nextProps) {
    //     this.setState(nextProps);
    // }
    
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