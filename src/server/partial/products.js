const express = require("express");
const connection = require("./connection.js");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const router = express.Router();
const app = express();
app.use(express.json());

router.use(bodyParser.json());

router.get("/api/users/:userid/products", (req, res) => {
  // get all products
  connection.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve products" });
      return;
    }
    res.json(results);
  });
});

router.get("/api/users/:userid/products", (req, res) => {
  // get product by ID
  const { productid } = req.body;
  connection.query(
    "SELECT * FROM users WHERE id = ?", [productid], (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve product" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "product not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});

router.get("/api/users/:userid/products", (req, res) => {
  // get all user's products 
  const username = req.params.username;
  connection.query(
    "SELECT * FROM products NATURAL JOIN user_product WHERE user_product.username= ?" ,
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve product" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "product not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});



router.post("/api/users/:userid/products", (req, res) => {
  // Add product
  const { id, product_name, is_dairy, price, quantity, discount_percentage, kosher_type, comments, sensitivity } = req.body;

  connection.query(
    "INSERT INTO products (id, product_name, is_dairy, price, quantity, discount_percentage, kosher_type, comments, sensitivity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [id, product_name, is_dairy, price, quantity, discount_percentage, kosher_type, comments, sensitivity],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to create product" });
        return;
      }
    }  
  );
});

router.put("/api/products/:productid/update_price", (req, res) => {
  // update price of product
  const id = req.params.id;
  const { price } = req.body;
  connection.query(
    "UPDATE products SET price = ? WHERE id = ?",
    [price, id],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update price" });
        return;
      }

      res.json({ message: "price updated successfully" });
    }
  );
});

router.put("/api/products/:productid/update_quantity", (req, res) => {
    // update quantity of product
    const id = req.params.id;
    const { quantity} = req.body;
    connection.query(
      "UPDATE products SET quantity = ? WHERE id = ?",
      [quantity, id],
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Failed to update quantity" });
          return;
        }
  
        res.json({ message: "Email updated quantity" });
      }
    );
  });


router.put("/api/products/:productid/update_sensitivity", (req, res) => {
  // update sensitivity of product
  const id = req.params.id;
  const { sensitivity } = req.body;
  connection.query(
    "UPDATE products SET sensitivity = ? WHERE id = ?",
    [sensitivity, id],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update sensitivity" });
        return;
      }

      res.json({ message: "sensitivity updated successfully" });
    }
  );
});  

router.put("/api/products/:productid/update_kosher", (req, res) => {
    // update kosher type of product
    const id = req.params.id;
    const { kosher_type } = req.body;
    connection.query(
      "UPDATE products SET kosher_type = ? WHERE id = ?",
      [kosher_type, id],
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Failed to update kosher_type" });
          return;
        }
  
        res.json({ message: "kosher_type updated successfully" });
      }
    );
  });  


  router.put("/api/products/:productid/update_is_dairy", (req, res) => {
    // update is_dairy of product
    const id = req.params.id;
    const { is_dairy } = req.body;
    connection.query(
      "UPDATE products SET is_dairy = ? WHERE id = ?",
      [is_dairy, id],
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Failed to update is_dairy" });
          return;
        }
  
        res.json({ message: "is_dairy updated successfully" });
      }
    );
  });   
  
  router.delete("/api/users/:userid/products", (req, res) => {
    // delete product
    const id = req.params.id;
    connection.query(
      "DELETE FROM products WHERE id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Failed to update is_dairy" });
          return;
        }
        connection.query(
            "DELETE FROM media_product WHERE product_id = ?",
            [id],
            (err, results) => {
              if (err) {
                console.error("Error executing MySQL query:", err);
                res.status(500).json({ error: "Failed to update is_dairy" });
                return;
              }  
        res.json({ message: "is_dairy updated successfully" });
            }
        );
      }
    );
  });
  
  
module.exports = router;
