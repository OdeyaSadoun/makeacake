const express = require('express');
const cors = require('cors');

const indexRouter = require('./server/routes/index_server');
const addressesRouter = require('./server/routes/addresses');
const eventsManagmentRouter = require('./server/routes/events_managment');
const ordersRouter = require('./server/routes/orders');
const productsRouter = require('./server/routes/products');
const usersRouter = require('./server/routes/users');

const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/', indexRouter);
app.use('/addresses', addressesRouter);
app.use('/events-managment', eventsManagmentRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

module.exports = app;

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
