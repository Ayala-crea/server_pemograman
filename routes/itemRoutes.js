const express = require('express');
const router = express.Router();
const { createItem, getItem, getItemById, deleteItem } = require('../controller/itemController.js');
const { verifyToken } = require('../middleware/verifyToken.js');

router.post('/item', verifyToken, createItem); // Gunakan uploadImage sebagai middleware
router.get('/items', getItem);
router.get('/items/:id_item', getItemById);
router.delete('/delete/item/:id_item', verifyToken, deleteItem);

module.exports = router;
