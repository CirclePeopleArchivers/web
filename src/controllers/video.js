/**
 * Modules dependencies
 */

const Video = require('../models').Video;
const Comment = require('../models').Comment;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * Video controller
 */

module.exports = {
    get: async (req, res) => {
        let videos = await Video
            .findAll({
                order: [
                    ['upload_date', 'DESC'],
                    ['title', 'ASC'],
                ],
                limit: 30,
                raw: true,
            });

        res.render('home', {
            title: '',
            videos: videos,
        });
    },
    getVideo: async (req, res) => {

    },
};
