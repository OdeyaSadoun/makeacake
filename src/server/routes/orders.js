const express = require("express");
const connection = require("../models/connection.js");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const router = express.Router();
const app = express();
app.use(express.json());

router.use(bodyParser.json());

router.get("/api/orders", (req, res) => {
  // get all orders
  connection.query("SELECT * FROM orders", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve orders" });
      return;
    }
    res.json(results);
  });
});

router.get("/api/users/:orderid", (req, res) => {
  // get order by ID
  const { orderid } = req.body;
  connection.query(
    "SELECT * FROM orders WHERE id = ?", [orderid], (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve order" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "order not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});

router.get("/api/orders/:userid", (req, res) => {
  // get all user's orders 
  const userid = req.params.userid;
  connection.query(
    "SELECT * FROM orders WHERE user_id= ?" ,
    [userid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve order" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "order not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});

router.get("/api/orders/:", (req, res) => {
    // get all products in order
    connection.query("SELECT * FROM orders", (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve orders" });
        return;
      }
      res.json(results);
    });
  });

router.post("/api/orders", (req, res) => {
  // Add order
  const { id, user_id,  payment_type, is_paid, is_shipping, order_address_id} = req.body;
  connection.query(
    "INSERT INTO products (id, user_id,  payment_type, is_paid, is_shipping, order_address_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [id, user_id,  payment_type, is_paid, is_shipping, order_address_id],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to create order" });
        return;
      }
    }  
  );
});

router.put("/api/orders/:orderid/update_payment_type", (req, res) => {
  // update payment_type of order
  const orderid = req.params.orderid;
  const { payment_type } = req.body;
  connection.query(
    "UPDATE orders SET payment_type = ? WHERE id = ?",
    [ payment_type, orderid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update payment_type" });
        return;
      }

      res.json({ message: "payment_type updated successfully" });
    }
  );
});

router.put("/api/orders/:orderid/update_is_paid", (req, res) => {
    // update is_paid of order
    const orderid = req.params.orderid;
    const { is_paid } = req.body;
    connection.query(
      "UPDATE orders SET is_paid = ? WHERE id = ?",
      [ is_paid, orderid],
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Failed to update is_paid" });
          return;
        }
  
        res.json({ message: "is_paid updated successfully" });
      }
    );
  });


router.put("/api/orders/:orderid/update_is_shipping", (req, res) => {
    // update is_shipping of order
    const orderid = req.params.orderid;
    const { is_shipping } = req.body;
    connection.query(
      "UPDATE orders SET is_shipping = ? WHERE id = ?",
      [ is_shipping, orderid],
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Failed to update is_shipping" });
          return;
        }
  
        res.json({ message: "is_shipping updated successfully" });
      }
    );
  });

//   router.put("/api/orders/:orderid/update_order_address_id", (req, res) => {
//     // update order_address_id of order
//     const orderid = req.params.orderid;
//     const { city, street, house_number } = req.body;
//     connection.query(
//       "UPDATE addresses SET city = ?, street = ?, house_number = ? WHERE id = ?",
//       [ is_shipping, orderid],
//       (err, results) => {
//         if (err) {
//           console.error("Error executing MySQL query:", err);
//           res.status(500).json({ error: "Failed to update is_shipping" });
//           return;
//         }
  
//         res.json({ message: "is_shipping updated successfully" });
//       }
//     );
//   });  
  

  
module.exports = router;
