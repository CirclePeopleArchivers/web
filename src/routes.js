/**
 * Modules dependencies
 */

const express = require('express');

const VideoController = require('./controllers').Video;

/**
 * Additional dependencies
 */

/**
 * Router file
 */

module.exports = (app) => {
    app.get('/', VideoController.get);
    app.get('/video/:id', VideoController.getVideo);
    app.get('/video/:id/stream', VideoController.streamVideo);

    app.use('/thumbnails', express.static('/mnt/z/thumbnails'));
    app.use('/assets', express.static(__dirname + '/views/assets'));
};
