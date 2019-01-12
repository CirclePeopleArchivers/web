/**
 * Modules dependencies
 */

const fs = require('fs');

const async = require('async');

const Video = require('../../models').Video;

/**
 * Sources data
 */

const files = fs.readdirSync('/mnt/z/final_output');
const metadatas = require('/mnt/z/scripts/pretty_metadata.json');

const filesExt = {};

for (let i = 0; i < files.length; i += 1) {
    const filename = files[i].split('.');
    filesExt[filename[0]] = filename[1];
}

async.eachOfSeries(metadatas, async (metadata, index) => {
    const year = metadata.upload_date.substr(0, 4);
    const month = metadata.upload_date.substr(4, 2);
    const day = metadata.upload_date.substr(6, 2);

    const date = new Date(year, month, day);

    try {
        await Video.create({
            id: metadata.id,
            title: metadata.title,
            view_count: metadata.view_count || 0,
            like_count: metadata.like_count || 0,
            dislike_count: metadata.dislike_count || 0,
            upload_date: date,
            description: metadata.description,
            file_type: filesExt[index],
        });

        console.log('Done ' + metadata.title);

        return true;
    } catch (e) {
        console.log(metadata);
        throw e;
    }
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Done');
    }
});
