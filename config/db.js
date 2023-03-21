const sqlite3 = require("sqlite3").verbose();

module.exports = class Db {
  constructor(filename) {
    this.filename = filename;
  }
  open() {
    return new sqlite3.Database(this.filename);
  }
};
