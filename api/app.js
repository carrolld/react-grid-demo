var express = require("express");
var app = express();
var cors = require('cors');
var url = require('url');
var querystring = require('querystring')

app.use(cors());
app.get("/", function(request, response) {
    let result = {};
    let count = 10000;
    let columns = request.query.columns ? parseInt(request.query.columns) : 1;
    let page = request.query.page ? parseInt(request.query.page) : 1;
    let start = (page - 1) * count;
    let parts = url.parse(request.url, true);
    let query = parts.query;
    result.sortColumn = query.sortColumn ? query.sortColumn : 'column1';
    result.sortOrder = query.sortOrder ? query.sortOrder : 'asc';

    if (start < 10000) {
        query.sortColumn = result.sortColumn;
        query.sortOrder = result.sortOrder;
        query.page = page + 1;
        result.nextPage = parts.pathname + '?' + querystring.stringify(query);
    } else {
        result.nextPage = false;
    }

    result.records = Array.from({length: count}).map(function(row, i) {
        let arr = [];
        for (let x = 1; x <= columns; x++) {
            if (x === 1) {
                arr.push(start + i + 1);
            } else {
                arr.push(Math.floor(Math.random() * (1000 - 1) + 1));
            }
        }
        return arr;
    });

    let sortColumnIndex = parseInt(result.sortColumn.replace('column', '')) - 1;
    let sortColumnOrder = result.sortOrder;

    result.records.sort(function(a, b) {
        if (a[sortColumnIndex] === b[sortColumnIndex]) {
            return 0;
        } else if (sortColumnOrder === "desc") {
            return a[sortColumnIndex] < b[sortColumnIndex] ? 1 : -1;
        } else {
            return a[sortColumnIndex] > b[sortColumnIndex] ? 1 : -1;
        }
    });

    response.send(result);
});

var server = app.listen(9002, function () {
    console.log("Listening on port %s...", server.address().port);
});