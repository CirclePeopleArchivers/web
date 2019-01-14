/**
 * Modules dependencies
 */

const path = require('path');

const express = require('express');

const VideoController = require('./controllers').Video;

/**
 * Additional dependencies
 */

const config = require('./configs/config');

/**
 * Router file
 */

module.exports = (app) => {
    app.get('/', VideoController.get);
    app.get('/video/:id', VideoController.getVideo);
    app.get('/video/:id/stream', VideoController.streamVideo);
    app.get('/search', VideoController.search);

    app.use('/thumbnails', express.static(config.paths.thumbnails));
    app.use('/assets', express.static(path.join(__dirname, '/views/assets')));
    app.use('/avatars', express.static(config.paths.avatars));
    app.get('/avatars/*', (req, res) => {
        res.sendFile(path.join(__dirname, '/views/assets/img/default.png'));
    });
};
