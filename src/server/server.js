const express = require('express');

const users = require('./partial/users');
const events_managment = require('./partial/events_managment');
const orders = require('./partial/orders');
const products = require('./partial/products');


const cors = require('cors');
const app = express();

app.use(cors()); // For using 2 ports one to server and one to client
app.use(express.json());
app.use(users);
app.use(events_managment);
app.use(orders);
app.use(products);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
