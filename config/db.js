const sqlite3 = require("sqlite3").verbose();

module.exports = class Db {
  constructor(dbPath) {
    this.dbPath = dbPath;
  }
  open() {
    return new sqlite3.Database(this.dbPath);
  }
};
