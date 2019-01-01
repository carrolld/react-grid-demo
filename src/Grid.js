import React, { Component } from 'react';
import './Grid.scss';
import GridColumn from './GridColumn';
import GridCell from './GridCell';
import Spinner from './Spinner';

class Grid extends Component {
    scrollStateEventHandler = this.setScrollState.bind(this);

    constructor(props) {
        super(props);

        let records = props.records ? props.records : [];

        this.state = {
            columns: [],
            records: records,
            loading: false,

            total: records.length,
            recordHeight: 25,
            recordsPerBody: 100,
            visibleStart: 0,
            visibleEnd: 100,
            displayStart: 0,
            displayEnd: 100 * 2,
            scroll: 0,
            shouldUpdate: false,
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

    componentDidMount() {
        window.requestAnimationFrame(function() {
            var node = this.refs.grid;
            if (node !== undefined) {
                let recordHeight = Math.floor(node.querySelector('[role=gridcell]').offsetHeight);
                let contentHeight = Math.floor(node.offsetHeight);
                recordHeight = recordHeight < 1 ? 30 : recordHeight;
                let recordsPerBody = Math.floor(contentHeight / recordHeight);
                this.setState({
                    recordHeight: recordHeight,
                    recordsPerBody: recordsPerBody,
                    visibleStart: 0,
                    visibleEnd: recordsPerBody,
                    displayStart: 0,
                    displayEnd: recordsPerBody * 4,
                });
            }
        }.bind(this));

        this.refs.grid.addEventListener('scroll', this.scrollStateEventHandler, false);
    }

    setScrollState(event) {
        let scroll = this.refs.grid.scrollTop;
        let visibleStart = Math.floor(scroll / this.state.recordHeight);
        let visibleEnd = Math.floor(Math.min(visibleStart + this.state.recordsPerBody, this.state.total - 1)) + this.state.recordHeight;
        let displayStart = Math.floor(Math.max(0, Math.floor(scroll / this.state.recordHeight) - this.state.recordsPerBody * 1.5));
        let displayEnd = Math.floor(Math.min(displayStart + 4 * this.state.recordsPerBody, this.state.total - 1)) + this.state.recordHeight;

        if (this.state.shouldUpdate ||
            !(visibleStart >= this.state.displayStart &&
            (visibleEnd + this.state.recordsPerBody) <= this.state.displayEnd
        )) {
            this.setState({
                visibleStart: visibleStart,
                visibleEnd: visibleEnd,
                displayStart: displayStart,
                displayEnd: displayEnd,
                scroll: scroll,
                shouldUpdate: false,
            });
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
        this.state.records.sort(function(a, b) {
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
        ref="grid"
        className="grid"
        role="grid"
        style={{
            "--gridCols": this.state.columns.length,
            "--gridRows": this.state.records.length
        }}
        >
            <div className="content" style={{
                height: this.state.total * this.state.recordHeight,
                paddingTop: this.state.displayStart * this.state.recordHeight,
                paddingBottom: this.state.recordHeight * 1.5,
            }}>
                {this.state.columns.map((column, i) => (
                    <GridColumn key={`column-${i}`} {...column} />
                ))}
                {this.state.records.slice(this.state.displayStart, this.state.displayEnd).reduce((res, row, line) => [
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
            </div>
            <Spinner shown={this.state.loading} />
        </div>;
    }
}

export default Grid;