const express = require('express');
const router = express.Router();
const { getAllCategory, getCategoryById } = require('../controller/categoryItemController.js');
const { verifyToken } = require('../middleware/verifyToken.js');

router.get('/category/all', getAllCategory);
router.get('/category/:id_category', getCategoryById);
router.post('/add/category', verifyToken, createCategory);

module.exports = router;