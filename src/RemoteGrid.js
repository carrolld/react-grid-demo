import Grid from './Grid';

class RemoteGrid extends Grid {
    scrollEventHandler = this.scrollEvent.bind(this);

    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            host: props.host,
            firstPage: props.url,
            nextPage: props.url,
        }
    }

    componentDidMount() {
        this.getRecords();
        super.componentDidMount();
    }

    getRecords() {
        if (this.state.loading) {
            return;
        }

        if (!this.state.nextPage) {
            this.removeScrollEvent();
            return;
        }

        this.setState({ loading: true });

        this.registerScrollEvent();

        var grid = this;

        fetch(this.state.host + this.state.nextPage)
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            let records = grid.state.records;
            records.push.apply(records, response.records);

            let columns = grid.state.columns;
            for (let i = 0; i < columns.length; i++) {
                if (columns[i].name === response.sortColumn) {
                    columns[i].sort = response.sortOrder;
                } else {
                    columns[i].sort = false;
                }
            }

            grid.setState({
                columns: columns,
                records: records,
                total: records.length,
                nextPage: response.nextPage,
                loading: false,
                shouldUpdate: true,
            });

            grid.setScrollState();

            if (!grid.state.nextPage) {
                grid.removeScrollEvent();
            }
        })
        .catch(function(ex) {
            console.log('parsing failed', ex)
        });
    }

    registerScrollEvent() {
        this.refs.grid.addEventListener('scroll', this.scrollEventHandler, false);
    }

    removeScrollEvent() {
        this.refs.grid.removeEventListener('scroll', this.scrollEventHandler, false);
    }

    scrollEvent() {
        if (this.state.displayEnd / this.state.total > 0.95) {
            this.getRecords();
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
                    sortOrder = 'asc';
                } else if (columns[i].sort === 'asc') {
                    sortIndex = i;
                    sortOrder = 'desc';
                }
            }
        }

        let sortColumn = columns[sortIndex].name;
        let url = document.createElement('a');
        url.href = this.state.firstPage;
        let searchParams = new URLSearchParams(url.search);
        searchParams.set('sortColumn', sortColumn);
        searchParams.set('sortOrder', sortOrder);
        searchParams.set('page', 1);
        let firstPage = url.pathname + '?' + searchParams.toString();

        this.setState({
            records: [],
            total: 0,
            firstPage: firstPage,
            nextPage: firstPage,
            },
            this.getRecords.bind(this));
    }
}

export default RemoteGrid;