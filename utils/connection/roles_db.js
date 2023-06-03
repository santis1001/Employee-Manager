function handler(db, type, data) {
    switch (type) {
        case 'add':
            console.log(data);
            break;
        case 'get':
            console.log('get');
            break;
        case 'mod':
            console.log(data);
            break;
        case 'del':
            console.log(data);
            break;
        case 'delAll':
            console.log('delAll');
            break;
        default: false
            break;
    }
}
module.exports = handler;