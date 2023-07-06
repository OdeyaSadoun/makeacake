const express = require("express");
const connection = require("./connection.js");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const router = express.Router(); // Create a router object to define routes
const app = express(); // Create an instance of the Express application
app.use(express.json()); // Parse incoming requests with JSON payloads

router.use(bodyParser.json()); // Parse request bodies as JSON

// Route to get all addresses
router.get("/api/addresses", (req, res) => {
  connection.query("SELECT * FROM addresses", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve addresses" });
      return;
    }

    res.json(results);
  });
});

// Route to get address by ID
router.get("/api/addresses/:addressid", (req, res) => {
  const addressId = req.params.addressid;
  connection.query(
    "SELECT * FROM addresses WHERE addressid = ?",
    [addressId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve address" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "Address not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});

// Route to add new address
router.post("/api/addresses", (req, res) => {
  const { city, street, house_number } = req.body;

  // Check if the address already exists
  connection.query(
    "SELECT * FROM addresses WHERE city = ? AND street = ? AND house_number = ?",
    [city, street, house_number],
    (err, addressResults) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to add address" });
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
        (err, insertResults) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to add address" });
            return;
          }

          const newAddressId = insertResults.insertId;
          res
            .status(201)
            .json({
              message: "Address added successfully",
              addressId: newAddressId,
              status: 201
            });
        }
      );
    }
  );
});

// Route to update address
router.put("/api/addresses/:addressid/update", (req, res) => {
    const { city, street, house_number } = req.body;
    const addressId = req.params.addressid;
  
    // Check if the address exists by addressid
    connection.query(
      "SELECT * FROM addresses WHERE addressid = ?",
      [addressId],
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Failed to update address" });
          return;
        }
  
        if (results.length === 0) {
          // Address not found
          res.status(404).json({ error: "Address not found" });
          return;
        }
  
        // Address exists, proceed with updating the address
        connection.query(
          "UPDATE addresses SET city = ?, street = ?, house_number = ? WHERE addressid = ?",
          [city, street, house_number, addressId],
          (err, updateResults) => {
            if (err) {
              console.error("Error executing MySQL query:", err);
              res.status(500).json({ error: "Failed to update address" });
              return;
            }
  
            res.json({ message: "Address updated successfully" });
          }
        );
      }
    );
  });

// Route to delete address
router.delete("/api/addresses/:addressid", (req, res) => {
  const addressId = req.params.addressid;
  
  // Check if the address is associated with any user
  connection.query(
    "SELECT * FROM users WHERE address_id = ?",
    [addressId],
    (err, userResults) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to delete address" });
        return;
      }

      if (userResults.length > 0) {
        // Address is associated with user(s), cannot delete
        res.status(400).json({ error: "Address is associated with user(s), cannot be deleted" });
        return;
      }

      // Check if the address is referenced in the events_management table
      connection.query(
        "SELECT * FROM events_management WHERE event_address_id = ?",
        [addressId],
        (err, eventResults) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to delete address" });
            return;
          }

          if (eventResults.length > 0) {
            // Address is associated with events, cannot delete
            res.status(400).json({ error: "Address is associated with event(s), cannot be deleted" });
            return;
          }

          // Check if the address is referenced in the orders table
          connection.query(
            "SELECT * FROM orders WHERE order_address_id = ?",
            [addressId],
            (err, orderResults) => {
              if (err) {
                console.error("Error executing MySQL query:", err);
                res.status(500).json({ error: "Failed to delete address" });
                return;
              }

              if (orderResults.length > 0) {
                // Address is associated with orders, cannot delete
                res.status(400).json({ error: "Address is associated with order(s), cannot be deleted" });
                return;
              }

              // No associated records, proceed with deleting the address
              connection.query(
                "DELETE FROM addresses WHERE id = ?",
                [addressId],
                (err, deleteResults) => {
                  if (err) {
                    console.error("Error executing MySQL query:", err);
                    res.status(500).json({ error: "Failed to delete address" });
                    return;
                  }

                  if (deleteResults.affectedRows === 0) {
                    res.status(404).json({ error: "Address not found" });
                    return;
                  }

                  res.json({ message: "Address deleted successfully" });
                }
              );
            }
          );
        }
      );
    }
  );
});




module.exports = router;
