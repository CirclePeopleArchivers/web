/**
 * CirclePeopleArchivers - web
 *
 * Author: Roguyt
 */

/**
 * Modules dependencies
 */

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const path = require('path');

/**
 * Additional dependencies
 */

const config = require('./configs/config');

/**
 * Configure Winston Logger
 */

const logger = require('./utils/logger');

logger.debug('Launching Winston Logger');

/**
 * Create Express server
 */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(cors());

if (config.env === 'production') {
    app.enable('trust proxy');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

/**
 * Add router to Express
 */

require('./routes.js')(app);

/**
 * Launch Express server
 */

const server = app.listen(config.port, config.host, () => {
    logger.info('Listening on port ' + config.port.toString());
    logger.info('Launched in ' + config.env + ' mode.');
    logger.info('Ctrl+C to shutdown the server.');

    process.on('SIGINT', () => {
        server.close();

        logger.info('Server shutdown.');

        process.exit(0);
    });
});
