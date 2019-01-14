/**
 * Modules dependencies
 */

const fs = require('fs');

const async = require('async');

/**
 * Sources data
 */

const files = fs.readdirSync('./output');
const metadatas = require('./ids4.json');

console.log(metadatas.length);

for (let i = 0; i < files.length; i += 1) {
    let index = metadatas.indexOf(files[i].split('.')[0]);
    if (index !== -1) metadatas.splice(index, 1);
}

console.log(metadatas.length);

fs.writeFile('./ids4.json', JSON.stringify(metadatas), 'utf8', () => {
    process.exit(0);
});
