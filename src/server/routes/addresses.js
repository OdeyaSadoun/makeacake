const connection = require("../models/connection.js");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

/*Parse request bodies as JSON*/
router.use(bodyParser.json());

// const AddressesDB = require("../models/addressQueries.js");

/*GET all addresses*/
router.get("/", (req, res) => {
  // AddressesDB.getAllAddresses()
  //   .then((results) => {
  //     res.json(results);
  //   })
  //   .catch((error) => {
  //     console.error("Error executing MySQL query:", error);
  //     res.status(500).json({ error: "Failed to retrieve addresses" });
  //     return;
  //   });
  connection.query("SELECT * FROM addresses", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve addresses" });
      return;
    }

    res.json(results);
  });
});

/*GET address by ID*/
router.get("/:addressid", (req, res) => {
  const addressId = req.body;
  // AddressesDB.getAddressesById(addressId)
  //   .then((results) => {
  //     if (results.length === 0) {
  //       res.status(404).json({ error: "Address not found" });
  //       return;
  //     }
  //     res.json(results[0]);
  //   })
  //   .catch((error) => {
  //     console.error("Error executing MySQL query:", error);
  //     res.status(500).json({ error: "Failed to retrieve address" });
  //     return;
  //   });
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

/*POST add new address*/
router.post("/add_address", (req, res) => {
  const { city, street, house_number } = req.body;

  // Check if the address already exists
  // AddressesDB.getAddressByCityAndStreetAndNumberHouse(
  //   city,
  //   street,
  //   house_number
  // )
  //   .then((resultsGetAddressByCityAndStreetAndNumberHouse) => {
  //     if (resultsGetAddressByCityAndStreetAndNumberHouse.length > 0) {
  //       res.status(400).json({ error: "Address already exists" });
  //       return;
  //     }
  //     AddressesDB.addAddress(city, street, house_number)
  //       .then((resultsAddAddress) => {
  //         const newAddressId = resultsAddAddress.insertId;
  //         res.status(201).json({
  //           message: "Address added successfully",
  //           addressId: newAddressId,
  //           status: 201,
  //         });
  //       })
  //       .catch((errorAddAddress) => {
  //         console.error("Error executing MySQL query:", errorAddAddress);
  //         res.status(500).json({ error: "Failed to add address" });
  //         return;
  //       });
  //   })
  //   .catch((errorGetAddressByCityAndStreetAndNumberHouse) => {
  //     console.error(
  //       "Error executing MySQL query:",
  //       errorGetAddressByCityAndStreetAndNumberHouse
  //     );
  //     res.status(500).json({
  //       error: "Failed to get address by city and street and house number",
  //     });
  //     return;
  //   });
  console.log(city, street, house_number);
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
          res.status(201).json({
            message: "Address added successfully",
            addressId: newAddressId,
            status: 201,
          });
        }
      );
    }
  );
});

/*PUT update address*/
router.put("/update_address/:addressid", (req, res) => {
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

/*DELETE address*/
router.delete("/delete_address/:addressid", (req, res) => {
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
        res.status(400).json({
          error: "Address is associated with user(s), cannot be deleted",
        });
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
            res.status(400).json({
              error: "Address is associated with event(s), cannot be deleted",
            });
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
                res.status(400).json({
                  error:
                    "Address is associated with order(s), cannot be deleted",
                });
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
