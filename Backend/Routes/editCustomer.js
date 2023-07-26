const express = require('express');
const router = express.Router();
const Customer = require('../DB/Schema/customerSchema');

// create api route to edit customer by customer_id using sql query
router.put('/:customer_id', async (req, res) => {

    try {
        const {
            name,
            email,
            contact_details,
            status
        } = req.body;
        const customer = await Customer.update({
            name,
            email,
            contact_details,
            status
        }, {
            where: {
                customer_id: req.params.customer_id
            }
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