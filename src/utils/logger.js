/**
 * Modules dependencies
 */

const winston = require('winston');

/**
 * Additional dependencies
 */

const config = require('../configs/config');

/**
 * Winston Logger Config
 */

const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
        sql: 7,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'green',
        verbose: 'cyan',
        debug: 'blue',
        silly: 'magenta',
        sql: 'blue',
    },
};

const alignedWithColorsAndTime = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => {
        const {
            timestamp, level, message, ...args
        } = info;

        const ts = timestamp.slice(0, 19).replace('T', ' ');
        return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }),
);

winston.addColors(logLevels.colors);

const transporters = [
    new winston.transports.File({ filename: './logs/logfile.log', maxsize: 10 * 1024 * 1024, level: 'http' }),
    new winston.transports.File({ filename: './logs/debug.log', maxsize: 10 * 1024 * 1024, level: 'sql' }),
];

if (config.env === 'development') {
    transporters.push(new winston.transports.Console({ level: 'silly', prettyPrint: true, colorize: true }));
}

const logger = winston.createLogger({
    format: alignedWithColorsAndTime,
    levels: logLevels.levels,
    transports: transporters,
});

module.exports = logger;
