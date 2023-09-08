const fs = require("fs");
const connection = require("../models/connection.js");

// Upload an image to the database
function uploadImageToMediaProduct(imagePath, productid) {
  // Read the image as binary data
  fs.readFile(imagePath, (error, imageData) => {
    if (error) {
      console.error("Error reading image file:", error);
      return;
    }

    const query = "INSERT INTO media_product (media, product_id) VALUES (?, ?)";

    connection.query(query, [imageData, productid], (error, results) => {
      if (error) {
        console.error("Error uploading image to database:", error);
        return;
      }
      console.log("Image uploaded successfully");
    });
  });
}

module.exports = uploadImageToMediaProduct;
