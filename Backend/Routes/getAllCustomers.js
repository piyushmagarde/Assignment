const express = require('express');
const router = express.Router();
const Customer = require('../DB/Schema/customerSchema');

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json({
            status: 'success',
            data: customers
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

module.exports = router;