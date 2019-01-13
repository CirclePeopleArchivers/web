/**
 * Modules dependencies
 */

const Video = require('../models').Video;
const Comment = require('../models').Comment;

const Joi = require('joi');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const fs = require('fs');

/**
 * Video controller
 */

let joiSchemas = {
    getVideo: {
        id: Joi.string().required(),
    },
    search: {
        query: Joi.string().required(),
    },
};

module.exports = {
    get: async (req, res) => {
        const videos = await Video
            .findAll({
                order: [
                    ['upload_date', 'DESC'],
                    ['title', 'ASC'],
                ],
                limit: 30,
                raw: true,
            });

        return res.render('home', {
            title: '',
            videos: videos,
        });
    },
    getVideo: async (req, res) => {
        const datas = req.params;

        try {
            await Joi.validate(datas, joiSchemas.getVideo, { abortEarly: false });
        } catch (e) {
            // Handle error
        }

        try {
            const video = await Video
                .findOne({
                    where: {
                        id: datas.id,
                    },
                    raw: true,
                });

            if (!video) {
                // 404
                return false;
            }

            const comments = await Comment
                .findAll({
                    where: {
                        video_id: datas.id,
                    },
                    order: [
                        ['parent_id', 'ASC'],
                        ['like_count', 'DESC'],
                        ['published_date', 'ASC'],
                    ],
                    raw: true,
                });

            let i = comments.length;
            while (i--) {
                let comment = comments[i];

                if (comment.parent_id === null && !comment.children) {
                    comment.children = [];
                }

                if (comment.parent_id !== null) {
                    let stop = false;
                    for (let j = 0; j < comments.length && !stop; j += 1) {
                        if (comments[j].id === comment.parent_id) {
                            comments[j].children.push(comment);

                            comments.splice(i, 1);

                            stop = true;
                        }
                    }
                }
            }

            return res.render('video-player', {
                title: video.title,
                video: video,
                comments: comments,
            });
        } catch (e) {
            console.log(e);
            // Handle DB error

            return false;
        }
    },
    search: async (req, res) => {
        const datas = req.query;

        try {
            await Joi.validate(datas, joiSchemas.getVideo, { abortEarly: false });
        } catch (e) {
            // Handle error
        }

        const keywords = datas.query.split(' ');

        let like = [];

        for (let i = 0; i < keywords.length; i += 1) {
            like.push({
                title: {
                    [Op.iLike]: '%' + keywords[i] + '%',
                },
            });
        }

        try {
            const videos = await Video
                .findAll({
                    where: {
                        [Op.and]: like,
                    },
                    order: [
                        ['view_count', 'DESC'],
                        ['upload_date', 'DESC'],
                        ['title', 'ASC'],
                    ],
                    raw: true,
                });

            return res.render('video-search', {
                title: '',
                query: datas.query,
                videos: videos,
            });
        } catch (e) {
            console.log(e);
            // Handle DB error

            return false;
        }
    },
    streamVideo: async (req, res) => {
        const datas = req.params;

        try {
            await Joi.validate(datas, joiSchemas.getVideo, { abortEarly: false });
        } catch (e) {
            // Handle error
        }

        try {
            const video = await Video
                .findOne({
                    where: {
                        id: datas.id,
                    },
                    raw: true,
                });

            if (!video) {
                // 404
                return false;
            }

            const path = '/mnt/z/final_output/' + video.id + '.' + video.file_type + '';
            const stat = fs.statSync(path);
            const fileSize = stat.size;
            const range = req.headers.range;

            if (range) {
                const parts = range.replace(/bytes=/, '').split('-');
                const start = parseInt(parts[0], 10);
                const end = parts[1]
                    ? parseInt(parts[1], 10)
                    : fileSize - 1;
                const chunkSize = (end - start) + 1;
                const file = fs.createReadStream(path, { start, end });
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': 'video/' + video.file_type,
                };

                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/' + video.file_type,
                };

                res.writeHead(200, head);
                fs.createReadStream(path).pipe(res);
            }

            return true;
        } catch (e) {
            console.log(e);
            // Handle DB error

            return false;
        }
    },
};
