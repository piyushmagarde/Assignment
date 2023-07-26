const express = require('express');
const router = express.Router();
const Customer = require('../DB/Schema/customerSchema');

router.post('/', async (req, res) => {
    try {
        const {
            name,
            email,
            contact_details,
            status
        } = req.body;
        const customer = await Customer.create({
            name,
            email,
            contact_details,
            status
        });
        res.status(200).json({
            status: 'success',
            data: customer
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

module.exports = router;