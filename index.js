const express = require("express");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodemysql",
});
// connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

const app = express();

// Create Db
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Databse created...");
  });
});

// create table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("posts table created");
  });
});
// Inser post
app.get("/addpost1", (req, res) => {
  let post = { title: "post 4", body: "this is post number 4" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post 4 added");
  });
});

// Select posts
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Posts fetched...");
  });
});

// Select single post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`post fetched from post no${req.params.id}`);
  });
});
// Update post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Updated tilte";
  let sql = `UPDATE posts SET title= '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`post Updated no${req.params.id}`);
  });
});

// Delete post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts  WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`post Deleted post No: ${req.params.id}`);
  });
});

app.listen("3000", () => {
  console.log("Server started on prot 3000");
});
