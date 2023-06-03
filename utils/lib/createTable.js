
function CreateTable(jsonData) {
    const Table = require('cli-table');
    const headers = Object.keys(jsonData[0]);
    const table = new Table({
        head: headers
    });

    jsonData.forEach(person => {
        const rowData = headers.map(header => person[header]);
        table.push(rowData);
    });
    return table.toString();
}
module.exports = CreateTable;