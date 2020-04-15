const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.resolve(__dirname, '..', 'db.json'));
console.log(adapter);
const db = low(adapter);

module.exports = db;