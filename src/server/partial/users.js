const express = require("express");
const connection = require("./connection.js");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const router = express.Router(); // Create a router object to define routes
const app = express(); // Create an instance of the Express application
app.use(express.json()); // Parse incoming requests with JSON payloads

router.use(bodyParser.json()); // Parse request bodies as JSON

// Route to retrieve all users
router.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve users" });
      return;
    }
    res.json(results);
  });
});

// Route to retrieve a user by ID
router.get("/api/users/:id", (req, res) => {
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

// Route to handle user registration
router.post("/api/users/register", (req, res) => {
  const {
    first_last_name,
    username,
    password,
    email,
    phone,
    city,
    street,
    house_number,
    date_of_birth,
    id_card,
    is_admin,
  } = req.body;

  // Check if the user already exists by username or id_card because they need to be unique
  connection.query(
    "SELECT * FROM users WHERE username = ? OR id_card = ?",
    [username, id_card],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to create user" });
        return;
      }

      if (results.length > 0) {
        // User with the same username or id_card already exists
        res.status(400).json({ error: "User already exists" });
        return;
      }

      // Check if the address already exists
      connection.query(
        "SELECT * FROM addresses WHERE city = ? AND street = ? AND house_number = ?",
        [city, street, house_number],
        (err, addressResults) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to create address" });
            return;
          }

          if (addressResults.length > 0) {
            // Address already exists
            res.status(400).json({ error: "Address already exists" });
            return;
          }

          // Insert new address into the 'addresses' table
          connection.query(
            "INSERT INTO addresses (city, street, house_number) VALUES (?, ?, ?)",
            [city, street, house_number],
            (err, addressInsertResults) => {
              if (err) {
                console.error("Error executing MySQL query:", err);
                res.status(500).json({ error: "Failed to create address" });
                return;
              }

              // Retrieve the generated address ID
              const addressId = addressInsertResults.insertId;

              // Insert new user into the 'users' table with the address ID
              connection.query(
                "INSERT INTO users (first_last_name, username, email, phone, address_id, date_of_birth, id_card, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                  first_last_name,
                  username,
                  email,
                  phone,
                  addressId,
                  date_of_birth,
                  id_card,
                  is_admin,
                ],
                (err, userInsertResults) => {
                  if (err) {
                    console.error("Error executing MySQL query:", err);
                    res.status(500).json({ error: "Failed to create user" });
                    return;
                  }

                  // Retrieve the generated user ID
                  const userId = userInsertResults.insertId;

                  // Insert the password into the passwords table
                  connection.query(
                    "INSERT INTO passwords (user_id, system_password) VALUES (?, ?)",
                    [userId, password],
                    (err) => {
                      if (err) {
                        console.error("Error executing MySQL query:", err);
                        res
                          .status(500)
                          .json({ error: "Failed to create user" });
                        return;
                      }

                      res
                        .status(201)
                        .json({
                          message: "User created successfully",
                          status: 201,
                        });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

// Route to handle user login
router.post("/api/users/login", (req, res) => {
  const { username, system_password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE id = (SELECT id FROM passwords WHERE username = ? AND system_password = ?)",
    [username, system_password],
    (err, results) => {
      console.log(username, system_password);
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

// Route to update user email
router.put("/api/users/:username/update_email", (req, res) => {
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

// Route to update user phone
router.put("/api/users/:username/update_phone", (req, res) => {
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

// Route to update user name
router.put("/api/users/:username/update_name", (req, res) => {
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

// Route to update user password
router.put("/api/users/:username/update_password", (req, res) => {
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
