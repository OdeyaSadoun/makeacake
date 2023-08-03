const connection = require("./connection.js");

module.exports.getAllAddresses = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM addresses", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports.getAddressesById = (addressId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM addresses WHERE addressid = ?",
      [addressId],
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
  