/**
 * Modules dependencies
 */

const fs = require('fs');

const Comment = require('../../models').Comment;

/**
 * Yes this code is dirty.
 */

(async function getChannelsId() {
    try {
        const channelsId = await Comment
            .findAll({
                attributes: ['author_id'],
                raw: true,
            });

        let channelsIdArray = [];

        for (let i = 0; i < channelsId.length; i += 1) {
            channelsIdArray.push(channelsId[i].author_id);
        }

        const channelsIdUnique = [...new Set(channelsIdArray)];

        fs.writeFile('./ids.json', JSON.stringify(channelsIdUnique), 'utf8', () => {
            process.exit(0);
        });
    } catch (e) {
        console.log(e);
    }
})();
