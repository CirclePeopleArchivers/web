/**
 * Modules dependencies
 */

const fs = require('fs');

const async = require('async');

const Comment = require('../../models').Comment;

/**
 * Sources data
 */

const metadatas = require('/mnt/z/comments/pretty_threads.json');

/**
 * Yes this code is dirty.
 */

/**
 * Functions
 */

async function createComment(comment, parentId, metadata) {
    await Comment.create({
        id: comment.id,
        video_id: metadata,
        parent_id: parentId,
        content: comment.content,
        like_count: comment.likes,
        author_id: comment.author.id,
        author_name: comment.author.name,
        published_date: comment.published,
        updated_date: comment.updated || null,
    });
}

async.eachOfSeries(metadatas, async (metadata, index) => {
    await async.eachOfSeries(metadata, async (comment, idx) => {
        try {
            await createComment(comment, null, index);

            console.log('.');

            await async.eachOfSeries(comment.replies, async (reply, idx2) => {
                try {
                    await createComment(reply, comment.id, index);
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
