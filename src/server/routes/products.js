const connection = require("../models/connection.js");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
/*Parse request bodies as JSON*/
router.use(bodyParser.json());

/*GET get all products*/
router.get("/", (req, res) => {
  connection.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve products" });
      return;
    }
    res.json(results);
  });
});

/*GET product by ID*/
router.get("/:userid", (req, res) => {
  const { productid } = req.body;
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [productid],
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

/*GET all user's products by user id*/
router.get("/user/:userid", (req, res) => {
  const userid = req.params.userid;
  connection.query(
    "SELECT * FROM product_user WHERE user_id= ?",
    [userid],
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

/*GET all like user's products by user id*/
router.get("/user/like/:userid", (req, res) => {
  const userid = req.params.userid;
  const like=true;
  connection.query(
    "SELECT * FROM product_user WHERE user_id= ? AND is_like= ? ",
    [userid, like],
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


/*POST add product*/
router.post("/add_product", (req, res) => {
  const {
    id,
    product_name,
    is_dairy,
    price,
    discount_percentage,
    kosher_type,
    comments,
    sensitivity,
  } = req.body;

  connection.query(
    "INSERT INTO products (id, product_name, is_dairy, price, discount_percentage, kosher_type, comments, sensitivity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id,
      product_name,
      is_dairy,
      price,
      discount_percentage,
      kosher_type,
      comments,
      sensitivity,
    ],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to create product" });
        return;
      }
    }
  );
});

/*POST add productUser*/
router.post("/add_product_user", (req, res) => {
  const {
    user_id,
    product_id,
    quantity,
    is_like,
  } = req.body;

  connection.query(
    "INSERT INTO products ( user_id, product_id, quantity, is_like) VALUES (?, ?, ?, ?, ?)",
    [
      user_id,
      product_id,
      quantity,
      is_like,
    ],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to create product_user" });
        return;
      }
    }
  );
});

/*PUT update price of product*/
router.put("/update_price/:productid", (req, res) => {
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

/*PUT update quantity of product*/
router.put("/update_quantity/:productid", (req, res) => {
  const productid = req.params.productid;
  const { quantity, userid } = req.body;
  connection.query(
    "UPDATE product_user SET quantity = ? WHERE user_id = ? AND product_id = ?",
    [quantity ,userid, productid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update quantity" });
        return;
      }

      res.json({ message: "updated quantity" });
    }
  );
});

/*PUT update sensitivity of product*/
router.put("/update_sensitivity/:productid", (req, res) => {
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

/*PUT update kosher type of product*/
router.put("/update_kosher/:productid", (req, res) => {
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

/*PUT update "is dairy" of product*/
router.put("/update_is_dairy/:productid", (req, res) => {
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

/*PUT update "is like" of product*/
router.put("/update_is_like/:productid", (req, res) => {
  const productid = req.params.productid;
  const {userid, is_like } = req.body;
  connection.query(
    "UPDATE product_user SET is_like = ? WHERE user_id = ? AND product_id = ?",
    [is_like, userid,productid],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update is_like" });
        return;
      }

      res.json({ message: "is_like updated successfully" });
    }
  );
});

/*DELETE product*/
router.delete("/delete_products/:productid", (req, res) => {
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



/*DELETE productUser*/
router.delete("/delete_user_product/:productid", (req, res) => {
  const id = req.params.productid;
  const {userid } = req.body;
  connection.query(
    "DELETE FROM product_user WHERE user_id = ? AND product_id = ?",
    [userid ,id],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update is_dairy" });
        return;
      }
    }
  );
});




module.exports = router;
