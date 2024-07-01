const express = require('express');
const router = express.Router();
const { createOrder, getOrderById } = require('../controller/orderController.js');
const { verifyToken } = require('../middleware/verifyToken.js');

router.post('/order', verifyToken, createOrder);
router.get('/order', verifyToken, getOrderById);

module.exports = router;