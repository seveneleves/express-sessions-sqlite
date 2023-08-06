require("dotenv").config();
const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const cors = require("cors");
const Db = require("./config/db");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    store: new SQLiteStore({ db: "/Users/paullevent/db/sessions.db" }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("*", (req, res, next) => {
  console.log(req.session);
  next();
});

// @        GET - /api/auth
// desc.    Check if the user exists
app.get("/auth", (req, res) => {
  //   if (req.session.userId) {
  //     //! TODO: check if true is necessary
  //     res.status(200).json({ isAuthenticated: true });
  //   } else {
  //     res.status(401).json({ err: "Unauthorized. User has to sing in." });
  //   }
  // });

// @        POST - /api/register
// desc.    Create a new user in DB
app.post("/api/register", (req, res) => {
  // const { username, password, firstName, lastName } = req.body;
  const db = new Db(process.env.DATABASE_URL).open();
  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)"
    );
  });

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send("Internal server error.");
      console.error(err);
    }
    db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      username,
      hash,
      (err) => {
        if (err) {
          return res.status(500).send("Internal server error.");
          console.error(err);
        }
        return res.send(200).send("User successfully created!");
      }
    );
  });

    // db.all(`SELECT * FROM users WHERE username = ?`, [username], (err, rows) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     if (rows.length === 0) {
    //       // If user does not exist in database yet
    //       const { hash, salt } = generateHash(password);
    //       const newUserQuery = `INSERT INTO users (username, password_hash, salt, first_name, last_name) VALUES (?, ?, ?, ?, ?)`;
    //       db.run(
    //         newUserQuery,
    //         [username, hash, salt, firstName, lastName],
    //         (err) => {
    //           if (err) {
    //             console.error(`Error while creating new user: ${err}`);
    //           } else {
    //             console.log(`User ${username} created successfully.`);
    //           }
    //         }
    //       );
    //     } else {
    //       // If user exists in database
    //       res.status(500).json({ err: "User already exists." });
    //     }
    //   }
    db.close();
    
  });

app.listen(process.env.SERVER_PORT, () =>
  console.log(`[app] server is listening on port ${process.env.SERVER_PORT}`)
);
