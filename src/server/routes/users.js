const connection = require("../models/connection.js");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

/*Parse request bodies as JSON*/
router.use(bodyParser.json());

// const UsersDB = require("../models/usersQueries.js");

/*GET all users*/
router.get("/", (req, res) => {
  // UsersDB.getAllUsers()
  //   .then((results) => {
  //     res.json(results);
  //   })
  //   .catch((error) => {
  //     console.error("Error executing MySQL query:", error);
  //     res.status(500).json({ error: "Failed to retrieve users" });
  //     return;
  //   });
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve users" });
      return;
    }
    res.json(results);
  });
});

/*GET user by id*/
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  // UsersDB.getUserById(userId)
  //   .then((results) => {
  //     if (results.length === 0) {
  //       res.status(404).json({ error: "User not found" });
  //       return;
  //     }
  //     res.json(results[0]);
  //   })
  //   .catch((error) => {
  //     console.error("Error executing MySQL query:", error);
  //     res.status(500).json({ error: "Failed to retrieve user" });
  //     return;
  //   });

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

/* POST add new user */
router.post("/register", (req, res) => {
  const {
    first_last_name,
    username,
    email,
    phone,
    city,
    street,
    house_number,
    date_of_birth,
    id_card,
    system_password,
    is_admin,
  } = req.body;

  // Check if the user already exists by username or id_card
  connection.query(
    "SELECT id FROM users WHERE username = ? OR id_card = ?",
    [username, id_card],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({
          error: "Failed to create user when checking if user exists",
        });
        return;
      }

      if (results.length > 0) {
        res.status(400).json({ error: "User already exists" });
        return;
      }

      console.log("user is new one");
      console.log("go to address", city, street, house_number);

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

          let addressId;

          if (addressResults.length === 0) {
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
                addressId = addressInsertResults.insertId;

                // Insert user with address
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
                      res.status(500).json({
                        error: "Failed to create user after having the address",
                      });
                      return;
                    }

                    // Insert password for user
                    connection.query(
                      "INSERT INTO passwords (username, system_password) VALUES (?, ?)",
                      [username, system_password],
                      (err) => {
                        if (err) {
                          console.error("Error executing MySQL query:", err);
                          res.status(500).json({
                            error: "Failed to create password for user",
                          });
                          return;
                        }

                        res.status(201).json({
                          message: "User created successfully",
                          status: 201,
                        });
                      }
                    );
                  }
                );
              }
            );
          } else {
            addressId = addressResults[0].id;

            // Insert user with existing address
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
                  res.status(500).json({
                    error: "Failed to create user after having the address",
                  });
                  return;
                }

                // Insert password for user
                connection.query(
                  "INSERT INTO passwords (username, system_password) VALUES (?, ?)",
                  [username, system_password],
                  (err) => {
                    if (err) {
                      console.error("Error executing MySQL query:", err);
                      res
                        .status(500)
                        .json({ error: "Failed to create password for user" });
                      return;
                    }

                    res.status(201).json({
                      message: "User created successfully",
                      status: 201,
                      first_last_name,
                      username,
                      email,
                      phone,
                      addressId,
                      date_of_birth,
                      id_card,
                      is_admin,
                    });
                  }
                );
              }
            );
          }
        }
      );
    }
  );
});

// function createUserWithAddress(addressId) {
//   // Insert new user into the 'users' table with the address ID
//   connection.query(
//     'INSERT INTO users (first_last_name, username, email, phone, address_id, date_of_birth, id_card, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//     [
//       first_last_name,
//       username,
//       email,
//       phone,
//       addressId,
//       date_of_birth,
//       id_card,
//       is_admin,
//     ],
//     (err, userInsertResults) => {
//       if (err) {
//         console.error('Error executing MySQL query:', err);
//         res.status(500).json({ error: 'Failed to create user after have the address' });
//         return;
//       }

//       // Retrieve the generated user ID
//       const userId = userInsertResults.insertId;
//       createPasswordForUser(username, system_password, res);
//     }
//   );
// }

//   function createPasswordForUser(username, password, res) {
//     // Insert the password into the passwords table
//     connection.query(
//       'INSERT INTO passwords (username, system_password) VALUES (?, ?)',
//       [username, password],
//       err => {
//         if (err) {
//           console.error('Error executing MySQL query:', err);
//           res.status(500).json({ error: 'Failed to create password for user' });
//           return;
//         }

//         res.status(201).json({
//           message: 'User created successfully',
//           status: 201,
//         });
//       }
//     );
//   }
// });

/*POST user login*/
router.post("/login", (req, res) => {
  // get user by username and password
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE username = (SELECT username FROM passwords WHERE username = ? AND system_password = ?)",
    [username, password],
    (err, results) => {
      console.log(username, password);
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve user" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found", status: 404 });
        return;
      }

      res.json(results[0]);
    }
  );
});

/*PUT update user email*/
router.put("/update_email/:userid", (req, res) => {
  const { email, userid } = req.body;

  // Check if the user exists by userid
  connection.query(
    "SELECT * FROM users WHERE userid = ?",
    [userid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update email" });
        return;
      }

      if (results.length === 0) {
        // User does not exist
        res.status(404).json({ error: "User not found" });
        return;
      }

      // User exists, proceed with updating the email
      connection.query(
        "UPDATE users SET email = ? WHERE userid = ?",
        [email, userid],
        (err, updateResults) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to update email" });
            return;
          }

          res.json({ message: "Email updated successfully" });
        }
      );
    }
  );
});

/*PUT update user phone*/
router.put("/update_phone/:userid", (req, res) => {
  const { phone, userid } = req.body;

  // Check if the user exists by userid
  connection.query(
    "SELECT * FROM users WHERE userid = ?",
    [userid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update phone" });
        return;
      }

      if (results.length === 0) {
        // User does not exist
        res.status(404).json({ error: "User not found" });
        return;
      }

      // User exists, proceed with updating the phone number
      connection.query(
        "UPDATE users SET phone = ? WHERE userid = ?",
        [phone, userid],
        (err, updateResults) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to update phone" });
            return;
          }

          res.json({ message: "Phone updated successfully" });
        }
      );
    }
  );
});

/*PUT update user name*/
router.put("/update_name/:userid", (req, res) => {
  const { first_last_name, userid } = req.body;

  // Check if the user exists by userid
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update name" });
        return;
      }

      if (results.length === 0) {
        // User does not exist
        res.status(404).json({ error: "User not found" });
        return;
      }

      // User exists, proceed with updating the name
      connection.query(
        "UPDATE users SET first_last_name = ? WHERE id = ?",
        [first_last_name, userid],
        (err, updateResults) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to update name" });
            return;
          }

          res.json({ message: "Name updated successfully" });
        }
      );
    }
  );
});

/*PUT update user password*/
router.put("/update_password/:userid", (req, res) => {
  const { system_password, userid } = req.body;

  // Check if the user exists by userid
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update password" });
        return;
      }

      if (results.length === 0) {
        // User not found
        res.status(404).json({ error: "User not found" });
        return;
      }
      connection.query(
        "SELECT * FROM passwords WHERE id = ?",
        [userid],
        (err, results) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to update password" });
            return;
          }

          if (results.length === 0) {
            // User not found
            res
              .status(404)
              .json({ error: "Password for this userid not found" });
            return;
          }
        }
      );

      // User and password exists, proceed with updating the password
      connection.query(
        "UPDATE passwords SET system_password = ? WHERE id = ?",
        [system_password, userid],
        (err, updateResults) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to update password" });
            return;
          }

          if (updateResults.affectedRows === 0) {
            // Password update failed
            res.status(500).json({ error: "Failed to update password" });
            return;
          }

          res.json({ message: "Password updated successfully" });
        }
      );
    }
  );
});

/*PUT update user's is_admin value*/
router.put("/update_is_admin/:userid", (req, res) => {
  const { is_admin, userid } = req.body;

  // Check if the user exists by userid
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update is_admin" });
        return;
      }

      if (results.length === 0) {
        // User not found
        console.log("user id not found: ", userid);
        res.status(404).json({ error: "User not found" });
        return;
      }

      // User exists, proceed with updating the is_admin value
      connection.query(
        "UPDATE users SET is_admin = ? WHERE id = ?",
        [is_admin, userid],
        (err, updateResults) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to update is_admin" });
            return;
          }

          res.json({ message: "is_admin updated successfully" });
        }
      );
    }
  );
});

module.exports = router;
