import React, { Component } from 'react';
import './Grid.scss';

class Grid extends Component {
    render() {
      return <div
        className="grid"
        role="grid"
        style={{
            "--gridCols": this.props.columns.length,
            "--gridRows": this.props.rows.length
        }}
        >
            {this.props.columns.map(column => <div role="columnheader">{column}</div>)}
            {this.props.rows.reduce((res, row, line) => 
            [
                ...res,
                ...(row.map((cell, i) =>
                <div
                    key={`${line}-{i}`}
                    role="gridcell"
                    className={
                    line % 2 === 0
                        ? "even"
                        : "odd"
                    }
                >
                    <div className="label" role="columnheader">{this.props.columns[i]}</div>
                    {cell}
                </div>
                ))
            ], [])}
            <div role="gridcell"></div>
        </div>;
    }
}

export default Grid;