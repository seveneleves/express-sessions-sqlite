require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Db = require("./config/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API endpoints
app.get("/api", (req, res) => {
  res.status(200).send("This is /.");
});

app.get("/api/users", (req, res) => {
  const db = new Db(process.env.DB_PATH).open();

  db.all(`SELECT * FROM users ORDER BY name`, (err, rows) => {
    if (err) res.status(500).send("Internal server error");
    res.status(200).json({ users: rows });
  });

  db.close();
});

app.listen(process.env.SERVER_PORT, () =>
  console.log(`[app] server is listening on port ${process.env.SERVER_PORT}`)
);
