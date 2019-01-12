/**
 * Modules dependencies
 */

const fs = require('fs');
const path = require('path');

/**
 * Additional dependencies
 */

const basename = path.basename(__filename);
const controllers = {};

/**
 * Model bootstrap
 */

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        let myFile = file;
        // eslint-disable-next-line global-require
        const controller = require(path.join(__dirname, myFile));
        myFile = myFile.replace('.js', '');
        controllers[myFile[0].toUpperCase() + myFile.substring(1)] = controller;
    });

module.exports = controllers;
