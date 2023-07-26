const express = require('express');
const cors = require('cors');
const app = express();
const createCustomer = require('./Routes/createCustomer');
const getCustomer = require('./Routes/getCustomer');
const getAllCustomers = require('./Routes/getAllCustomers');
const editCustomer = require('./Routes/editCustomer');
const deleteCustomer = require('./Routes/deleteCustomer');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Define your routes
app.use('/api/createCustomer', createCustomer);
app.use('/api/getCustomer', getCustomer);
app.use('/api/getAllCustomers', getAllCustomers);
app.use('/api/editCustomer', editCustomer);
app.use('/api/deleteCustomer', deleteCustomer);

module.exports = app;