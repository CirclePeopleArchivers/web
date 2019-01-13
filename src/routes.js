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

    app.use('/thumbnails', express.static('/mnt/z/thumbnails'));
};
