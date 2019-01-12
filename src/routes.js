/**
 * Modules dependencies
 */

const VideoController = require('./controllers').Video;

/**
 * Additional dependencies
 */

/**
 * Router file
 */

module.exports = (app) => {
    app.get('/', VideoController.get);
};
