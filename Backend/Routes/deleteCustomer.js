const express = require('express');
const router = express.Router();
const Customer = require('../DB/Schema/customerSchema');

router.delete('/:customer_id', async (req, res) => {

    try {
        const customer = await Customer.destroy({
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