import React, { Component } from 'react';
import './Grid.scss';
import GridColumn from './GridColumn';
import GridCell from './GridCell';

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            data: props.data ? props.data : [],
        };
        
        if ('columns' in props) {
            for (let i = 0; i < props.columns.length; i++) {
                let column = props.columns[i];
                column.index = i;
                column.click = this.onSortColumn.bind(this);
                column.sort = 'sort' in column ? column.sort : false;
                this.state.columns.push(column);
            }
        }
    }

    onSortColumn(event) {
        let columns = this.state.columns;
        let sortIndex = 0;
        let sortOrder = 'asc';

        for (let i = 0; i < columns.length; i++) {
            if (i === parseInt(event.currentTarget.dataset.index)) {
                if (columns[i].sort === false) {
                    sortIndex = i;
                    sortOrder = columns[i].sort = 'asc';
                } else if (columns[i].sort === 'asc') {
                    sortIndex = i;
                    sortOrder = columns[i].sort = 'desc';
                } else {
                    columns[i].sort = false;
                    columns[0].sort = 'asc';
                }
            } else {
                columns[i].sort = false;
            }
        }

        this.sortDataByColumn(sortIndex, sortOrder);
        this.setState({ columns: columns });
    }

    sortDataByColumn(index, order) {
        this.state.data.sort(function(a, b) {
            if (a[index] === b[index]) {
                return 0;
            } else if (order === "desc") {
                return a[index] < b[index] ? 1 : -1;
            } else {
                return a[index] > b[index] ? 1 : -1;
            }
        });
    };

    render() {
      return <div
        className="grid"
        role="grid"
        style={{
            "--gridCols": this.state.columns.length,
            "--gridRows": this.state.data.length
        }}
        >
            {this.state.columns.map((column, i) => (
                <GridColumn key={`column-${i}`} {...column} />
            ))}
            {this.state.data.reduce((res, row, line) => [
                ...res,
                ...(row.map((cell, i) =>
                    <GridCell
                        key={`${line}-${i}`}
                        row={line}
                        column={i}
                        label={this.state.columns[i].label}
                        content={cell}
                    />
                ))
            ], [])}
            <div role="gridcell"></div>
        </div>;
    }
}

export default Grid;