const express = require('express');
const router = express.Router();
const Customer = require('../DB/Schema/customerSchema');
const e = require('express');

router.get('/:customer_id', async (req, res) => {

        try {
            const customer = await Customer.findOne({
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
    }

);


module.exports = router;