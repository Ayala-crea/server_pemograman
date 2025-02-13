const express = require("express");
const app = express();
const supabase = require("../config/db.js");
const configureMiddleware = require('../middleware/cors.js');
// Terapkan middleware CORS dan lainnya
configureMiddleware(app);

exports.createItem = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;

  if (!name || !description || !price || !quantity || !category ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const { data: productData, error: productError } = await supabase
      .from("items")
      .insert({
        name,
        description,
        price,
        quantity,
        category_id: category,
      })
      .select("*");

    if (productError) {
      return res
        .status(500)
        .json({ success: false, message: productError.message });
    }

    return res.status(201).json({
      success: true,
      message: "Insert product successfully!",
      data: productData[0],
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getItem = async (req, res) => {
  try {
    const { data, error } = await supabase.from("items").select("*");
    if (error) {
      return res.json(error.message);
    }
    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
};

exports.getItemById = async (req, res) => {
  const { id_items } = req.params;
  try {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("id_items", id_items);
    if (error) {
      return res.json(error.message);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
};

exports.deleteItem = async (req, res) => {
  const { id_items } = req.params;
  try {
    const { data, error } = await supabase
      .from("items")
      .delete()
      .eq("id_items", id_items);
    if (errorProduct) {
      return res.json(error.message);
    }

    return res.status(200).json({
      data: data,
      message: "Delete product successfully!",
    });
  } catch (error) {
    return res.json(error);
  }
};
exports.updateItem = async (req, res) => {
  const { id_items } = req.params;
  const { name, description, price, quantity, category } = req.body;
  try {
    const { data, error } = await supabase
      .from("items")
      .update({ name, description, price, quantity, category_id: category })
      .eq("id_items", id_items)
      .select("*");
    if (error) {
      return res.json(error.message);
    }
    return res.json({ data, message: "Update menu successfully!" });
  } catch (error) {
    return res.json(error);
  }
};

