/**
 * Modules dependencies
 */

const Video = require('../../models').Video;

/**
 * Yes this code is dirty.
 */

(async function getVideosMetadatas() {
    let results = [];

    try {
        const videos = await Video.findAll({
            raw: true,
            limit: null,
            attributes: ['title'],
        });

        for (let i = 0; i < videos.length; i += 1) {
            console.log(videos[i].title);

            let offset = 0;

            if (videos[i].title.indexOf('osu!') !== -1) {
                offset = 1;
            }

            if (videos[i].title.indexOf('[osu!') !== -1) {
                videos[i].title = videos[i].title.replace('/\[.+?]/', '');
                offset = 0;
            }

            let title = videos[i].title.split('|');

            if (title.length !== 1) {
                let musicArr = title[1 + offset].split(/ - (.+)/);
                musicArr = musicArr.filter(Boolean);

                let music = '';

                if (musicArr.length !== 1) {
                    music = musicArr[1];
                } else {
                    music = musicArr[0];
                }

                console.log(music);

                let difficulty = music.match(/\[(.+)]/)[1];
                let ppArr = videos[i].title.match(/(\d+)pp/);
                let pp = null;

                if (ppArr !== null) {
                    pp = ppArr[1];
                }

                let data = {
                    player: '',
                    author_song: '',
                    name_song: '',
                    difficulty: '',
                    pp: pp,
                };

                data.player = title[0].trim();
                data.author_song = title[1].substring(0, title[1].indexOf(music) - 3).trim();
                data.name_song = music.substring(0, music.indexOf(difficulty) - 2).trim();
                data.difficulty = difficulty.trim();

                results.push(data);
                console.log(data);
            }
        }
    } catch (e) {
        console.log(e);
    }
})();
