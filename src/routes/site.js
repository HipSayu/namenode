import db from './db';
import home from './home';

function route(app) {
    app.use('/', home);
    app.use('/db', db);
}

module.exports = route;
