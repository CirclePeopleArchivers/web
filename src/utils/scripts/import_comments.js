/**
 * Modules dependencies
 */

const fs = require('fs');

const async = require('async');

const Comment = require('../../models').Comment;

/**
 * Sources data
 */

const metadatas = require('/mnt/z/scripts/pretty.json').videos;

/**
 * Yes this code is dirty.
 */

/**
 * Functions
 */

async function createComment(comment, parentId, metadata) {
    const commentFind = await Comment.findAll({
        where: {
            id: comment.id,
        },
    });

    if (commentFind.length === 0) {
        await Comment.create({
            id: comment.id,
            video_id: metadata.id,
            parent_id: parentId,
            content: comment.content,
            like_count: comment.likes,
            author_id: comment.author.id,
            author_name: comment.author.name,
            published_date: comment.published,
            updated_date: comment.updated || null,
        });
        console.log('.');
    }
}

async.eachOfSeries(metadatas, async (metadata, index) => {
    const comments = metadata.comments;

    async.eachOfSeries(comments, async (comment, idx) => {
        try {
            await createComment(comment, null, metadata);

            async.eachOfSeries(comment.replies, async (reply, idx2) => {
                try {
                    await createComment(reply, comment.id, metadata);
                } catch (e) {
                    throw e;
                }
            }, (err) => {
                if (err) {
                    throw err;
                } else {
                    return true;
                }
            });

            console.log('-');

            return true;
        } catch (e) {
            throw e;
        }
    }, (err) => {
        if (err) {
            throw err;
        } else {
            return true;
        }
    });
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Done');
    }
});
