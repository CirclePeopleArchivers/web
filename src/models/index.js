/**
 * Modules dependencies
 */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const logger = require('../utils/logger');

/**
 * Additional dependencies
 */

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../configs/database.json'))[env];
const db = {};

/**
 * Model bootstrap
 */

Object.assign(config, {
    logging: function logging(debug) {
        logger.sql(debug);
    },
});

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
