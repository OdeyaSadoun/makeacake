const connection = require("./connection.js");



module.exports.getAllUserProducts = (userid) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM shopping_cart WHERE user_id= ?",
      [userid],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM products",
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};


module.exports.getProductById = (productid) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM products WHERE id = ?",[productid],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};







  module.exports.addProductUser = ( user_id, product_id, quantity) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO shopping_cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [user_id, product_id, quantity],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };

  module.exports.addLikeProductUser = ( user_id, product_id, is_like) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO like_product_user (user_id, product_id, is_like) VALUES (?, ?, ?)",
        [user_id, product_id, is_like],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };

  module.exports. updateProductQuantity= ( userid, productid, quantity) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE shopping_cart SET quantity = ? WHERE user_id = ? AND id = ?",
        [quantity ,userid, productid],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  