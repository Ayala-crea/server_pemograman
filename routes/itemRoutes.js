const express = require('express');
const router = express.Router();
const { createItem, getItem, getItemById, deleteItem, updateItem } = require('../controller/itemController.js');
const { verifyToken } = require('../middleware/verifyToken.js');

router.post('/item', verifyToken, createItem); // Gunakan uploadImage sebagai middleware
router.get('/items', getItem);
router.get('/items/:id_items', getItemById);
router.delete('/delete/item/:id_items', verifyToken, deleteItem);
router.put('/edit/:id_items', verifyToken, updateItem);

module.exports = router;
