const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');


// const indexRouter = require("./server/routes/index_server");
const addressesRouter = require("./src/server/routes/addresses");
const eventsManagmentRouter = require("./src/server/routes/events_managment");
const ordersRouter = require("./src/server/routes/orders");
const productsRouter = require("./src/server/routes/products");
const usersRouter = require("./src/server/routes/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use(fileUpload());
app.use(express.static('public'));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader("Access-Control-Allow-Headers", "*");

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

// app.use("/", indexRouter);
app.use("/addresses", addressesRouter);
app.use("/events-managment", eventsManagmentRouter);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

module.exports = app;

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
