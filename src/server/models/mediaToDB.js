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

// Example usage
uploadImageToMediaProduct("../../media/products/trickolad.jpg", 1); // Replace with your image path and product ID

// // Retrieve an image from the database
// function retrieveImage(imageId, outputPath) {
//   const query = "SELECT image_data FROM images WHERE id = ?";

//   connection.query(query, [imageId], (error, results) => {
//     if (error) throw error;

//     if (results.length > 0) {
//       const imageData = results[0].image_data;
//       fs.writeFileSync(outputPath, imageData); // Write binary data to a file
//       console.log("Image retrieved and saved successfully");
//     } else {
//       console.log("Image not found");
//     }
//   });
// }

// // Example usage
// uploadImage("path_to_image.jpg"); // Replace with your image path
// retrieveImage(1, "retrieved_image.jpg"); // Replace with your image ID and desired output path
