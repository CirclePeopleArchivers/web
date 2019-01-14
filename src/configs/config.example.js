/**
 * Module dependencies
 */

const pkg = require('../../package.json');

/**
 * Configuration file
 */

const config = {};

config.version = pkg.version;

config.port = process.env.PORT || 3000;
config.host = process.env.PORT || '127.0.0.1';
config.env = process.env.NODE_ENV || 'production';

/**
 * Path of assets
 */

config.paths = {};

config.paths.videos = '';
config.paths.thumbnails = '';
config.paths.avatars = '';

module.exports = config;
