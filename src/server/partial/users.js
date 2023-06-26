const express = require("express");
const connection = require("./connection.js");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const router = express.Router();
const app = express();
app.use(express.json());

router.use(bodyParser.json());

router.get("/api/users", (req, res) => {
  // get all users
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve users" });
      return;
    }
    res.json(results);
  });
});

router.get("/api/users/:id", (req, res) => {
  // get user by ID
  const userId = req.params.id;
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve user" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});

router.get("/api/users/:username", (req, res) => {
  // get user by username
  const username = req.params.username;
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve user" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});

router.post("/api/users/login", (req, res) => {
  // get user by username and password
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE id = (SELECT id FROM passwords WHERE username = ? AND system_password = ?)",
    [username, password],
    (err, results) => {
      console.log(username, password);
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve user" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});

router.post("/api/users/register", (req, res) => {
  // Add user
  const { first_last_name, username, password, email, phone, city, street, house_number, date_of_birth, id_card, is_admin } = req.body;

  connection.query(
    "INSERT INTO users (first_last_name, username, email, phone, city, street, house_number, date_of_birth, id_card, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [first_last_name, username, email, phone, city, street, house_number, date_of_birth, id_card, is_admin],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to create user1" });
        return;
      }

      // Retrieve the generated user ID
      const userId = results.insertId;

      // Insert the password into the passwords table
      connection.query(
        "INSERT INTO passwords (username, password) VALUES (?, ?)",
        [username, password],
        (err) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to create user2" });
            return;
          }

          res
            .status(201)
            .json({ message: "create user succefuly", status: 201 });
        }
      );
    }
  );
});

router.put("/api/users/:username/update_email", (req, res) => {
  // update email of user
  const username = req.params.username;
  const { email, userid } = req.body;
  connection.query(
    "UPDATE users SET email = ? WHERE userid = ?",
    [email, userid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update email" });
        return;
      }

      res.json({ message: "Email updated successfully" });
    }
  );
});

router.put("/api/users/:username/update_phone", (req, res) => {
  // update phone of user
  const username = req.params.username;
  const { phone, userid } = req.body;
  connection.query(
    "UPDATE users SET phone = ? WHERE userid = ?",
    [phone, userid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update phone" });
        return;
      }

      res.json({ message: "Phone updated successfully" });
    }
  );
});

router.put("/api/users/:username/update_name", (req, res) => {
  // update name of user
  const username = req.params.username;
  const { first_last_name, userid } = req.body;
  connection.query(
    "UPDATE users SET first_last_name = ? WHERE userid = ?",
    [first_last_name, userid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update name" });
        return;
      }

      res.json({ message: "Name updated successfully" });
    }
  );
});

router.put("/api/users/:username/update_password", (req, res) => {
  // update password of user
  const username = req.params.username;
  const { system_password, userid } = req.body;
  connection.query(
    "UPDATE passwords SET system_password = ? WHERE userid = ?",
    [system_password, userid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update password" });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json({ message: "Password updated successfully" });
    }
  );
});

module.exports = router;
