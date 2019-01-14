const fs = require('fs');
const async = require('async');
const request = require('request');

const ids = require('./ids4.json');

let counter = 0;

const keys = [];

let i = 0;

function downloadAndSave(url, name, callback) {
    request.get(url + '&key=' + keys[i], (err, res, body) => {
        if (res.statusCode === 403) {
            console.log(body);

            i += 1;

            if (i === 5) {
                i = 0;
            }

            console.log('Swapping keys');

            return downloadAndSave(url, name, callback);
        }

        body = JSON.parse(body);

        if (body.items.length === 0) {
            return callback();
        }

        let newUrl = body.items[0].snippet.thumbnails.default;

        return request.head(newUrl, function(err, res, body) {
            request(newUrl).pipe(fs.createWriteStream('./output/' + name)).on('close', callback);
        });
    });
}

async.mapLimit(ids, 4, (id, cb) => {
    let url = 'https://www.googleapis.com/youtube/v3/channels?part=snippet&id=' + id + '&fields=items(id%2Csnippet%2Fthumbnails)';

    downloadAndSave(url, id + '.jpg', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Done ' + id);
        }
        cb(err);
    });
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Done');
    }
});
