const connection = require("../models/connection.js");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

/*Parse request bodies as JSON*/
router.use(bodyParser.json());

/*Get all orders*/
router.get("/", (req, res) => {
  connection.query("SELECT * FROM orders", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve orders" });
      return;
    }
    res.json(results);
  });
});

/*Get order by ID*/
router.get("/:orderid", (req, res) => {
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

/*Get order by user's ID*/
router.get("/user/:userid", (req, res) => {
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

/*GET all products in order*/
router.get("/api/orders/:", (req, res) => {
    connection.query("SELECT * FROM orders", (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve orders" });
        return;
      }
      res.json(results);
    });
  });

/*POST add order*/
router.post("/add_order", (req, res) => {
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

/*PUT update payment type of order*/
router.put("/update_payment_type/:orderid", (req, res) => {
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

/*PUT update "is paid" of order*/
router.put("/update_is_paid/:orderid", (req, res) => {
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

/*PUT update "is shipping" of order*/
router.put("/update_is_shipping/:orderid", (req, res) => {
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
  
module.exports = router;
