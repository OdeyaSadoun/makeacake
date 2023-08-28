const connection = require("../models/connection.js");
const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const router = express.Router();
/*Parse request bodies as JSON*/
router.use(bodyParser.json());

/*GET get all products*/
router.get("/", (req, res) => {
  console.log("router.get");
  connection.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve products" });
      return;
    }
    res.json(results);
    console.log("results", results);
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
    "SELECT * FROM shopping_cart WHERE user_id= ?",
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
  const like = 1;
  connection.query(
    "SELECT * FROM like_product_user WHERE user_id= ? AND is_like= ? ",
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
    product_name,
    is_dairy,
    price,
    discount_percentage,
    kosher_type,
    comments,
    sensitivity,
    image,
  } = req.body;

  // Check if the product with the same name already exists
  connection.query(
    "SELECT * FROM products WHERE product_name = ?",
    [product_name],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({
          error: "Failed to create product",
        });
        return;
      }

      if (results.length > 0) {
        // Product with the same name already exists
        res.status(400).json({ error: "Product already exists" });
        return;
      }
      console.log("product is new one");
      // If the product doesn't exist, proceed with insertion
      connection.query(
        "INSERT INTO products (product_name, is_dairy, price, discount_percentage, kosher_type, comments, sensitivity) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          product_name,
          is_dairy === "" ? 0 : 1,
          price,
          discount_percentage === "" ? 0 : discount_percentage,
          kosher_type,
          comments,
          sensitivity,
        ],
        (err, results) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to create product" });
            return;
          } else {
            //Get the product ID
            const productId = results.insertId;

            connection.query(
              "INSERT INTO media_product (media, product_id) VALUES (?, ?)",
              [image, productId],
              (err, results) => {
                if (err) {
                  console.error("Error executing MySQL query:", err);
                  res.status(500).json({ error: "Failed to add image" });
                  return;
                }

                // Product insertion successful
                res.status(201).json({
                  message: "Product created successfully",
                  status: 201,
                  product_name,
                  productId,
                  is_dairy,
                  price,
                  discount_percentage,
                  kosher_type,
                  comments,
                  sensitivity,
                  image,
                });
              }
            );
          }
        }
      );
    }
  );
});

router.post("/upload_image", (req, res) => {
  const fileName = req.body.fileName;
  const fileData = req.body.fileData; // This is already the base64-encoded image data

  // Save the base64-encoded data to the file system
  const filePath = `/path/to/uploads/${fileName}`;
  console.log(filePath);
  fs.writeFile(filePath, fileData, 'base64', (err) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }

    // The file was uploaded successfully
    res.status(200).json({ fileName });
  });
});

/*POST add like productUser*/
router.post("/add_like_product_user", (req, res) => {
  const { user_id, product_id, is_like } = req.body;

  console.log(user_id, product_id, is_like, "serveradd like productuser");

  connection.query(
    "INSERT INTO like_product_user ( user_id, product_id, is_like) VALUES (?, ?, ?)",
    [user_id, product_id, is_like],
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
  const id = req.params.productid;
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

/*PUT update discount_percentage of product*/
router.put("/update_discount/:productid", (req, res) => {
  const id = req.params.productid;
  const { discount_percentage } = req.body;
  connection.query(
    "UPDATE products SET discount_percentage = ? WHERE id = ?",
    [discount_percentage, id],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update discount_percentage" });
        return;
      }

      res.json({ message: "discount_percentage updated successfully" });
    }
  );
});

/*PUT update quantity of product*/
router.put("/update_quantity/:productid", (req, res) => {
  const productid = req.params.productid;
  const { userid, quantity } = req.body;
  connection.query(
    "UPDATE shopping_cart SET quantity = ? WHERE user_id = ? AND id = ?",
    [quantity, userid, productid],
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
  const id = req.params.productid;
  const { is_dairy } = req.body;
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to find the product to update" });
        return;
      }
      if (results.length === 0) {
        console.error("Error executing MySQL query:", err);
        res.status(404).json({ error: "product not found" });
        return;
      }
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
    }
  );
});

/*PUT update "is like" of product*/
router.put("/update_is_like/:productid", (req, res) => {
  const productid = req.params.productid;
  const { userid, is_like } = req.body;
  connection.query(
    "UPDATE like_product_user SET is_like = ? WHERE user_id = ? AND product_id = ?",
    [is_like, userid, productid],
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

/* DELETE product */
router.delete("/delete_products/:productid", (req, res) => {
  const id = req.params.productid; // Use req.params to get the productid from the URL

  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (selectErr, selectResults) => {
      if (selectErr) {
        console.log(id);
        console.error("Error executing MySQL query:", selectErr);
        res.status(500).json({ error: "Failed to find the product" });
        return;
      }
      if (selectResults.length === 0) {
        // Use selectResults.length to check for results
        console.error("Product not found");
        res.status(404).json({ error: "Product not found" });
        return;
      }

      connection.query(
        "DELETE FROM media_product WHERE product_id = ?",
        [id],
        (err, mediaDeleteResults) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to delete product media" });
            return;
          }

          connection.query(
            "DELETE FROM products WHERE id = ?",
            [id],
            (err, productDeleteResults) => {
              if (err) {
                console.error("Error executing MySQL query:", err);
                res.status(500).json({ error: "Failed to delete product" });
                return;
              }
              res.json({ message: "Deleted successfully" });
            }
          );
        }
      );
    }
  );
});

/*DELETE productUser*/
router.delete("/delete_user_product/:productid", (req, res) => {
  const id = req.params.productid;
  const { userid } = req.body;
  connection.query(
    "DELETE FROM shoppind_cart WHERE user_id = ? AND product_id = ?",
    [userid, id],
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
