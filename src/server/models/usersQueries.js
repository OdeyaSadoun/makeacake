const connection = require("./connection.js");

module.exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM users", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports.getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE id = ?",
      [userId],
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

module.exports.getUserByUsernameAndPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM addresses WHERE id = ?",
      [username, password],
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
  

module.exports.getAddressByCityAndStreetAndNumberHouse = (city, street, house_number) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM addresses WHERE city = ? AND street = ? AND house_number = ?",
        [city, street, house_number],
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

module.exports.addAddress = (city, street, house_number) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO addresses (city, street, house_number) VALUES (?, ?, ?)",
        [city, street, house_number],
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
  