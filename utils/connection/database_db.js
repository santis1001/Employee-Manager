function handler(db, type, data) {
    switch (type) {
        case 'init':
            console.log('init');
            break;
        case 'delAll':
            console.log('Del');
            break;
    }
}
module.exports = handler;