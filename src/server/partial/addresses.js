const express = require("express");
const connection = require("./connection.js");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const router = express.Router(); // Create a router object to define routes
const app = express(); // Create an instance of the Express application
app.use(express.json()); // Parse incoming requests with JSON payloads

router.use(bodyParser.json()); // Parse request bodies as JSON

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


module.exports = router;
