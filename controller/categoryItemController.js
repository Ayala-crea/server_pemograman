const express = require("express");
const app = express();
const supabase = require("../config/db.js");
const configureMiddleware = require("../middleware/cors.js");
// Terapkan middleware CORS dan lainnya
configureMiddleware(app);

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const { data, error } = await supabase
      .from("category_items")
      .insert({ name })
      .select("*");
    if (error) {
      return res.status(500).json({
        message: "error",
        error: error,
      });
    }
    return res.json({
      data: data,
      succcess: true,
      messaage: "Berhasil Menambahkan category",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  const { id_category } = req.params;
  const { name } = req.body;
  try {
    const { data, error } = await supabase
      .from("category_items")
      .update({ name })
      .eq("id_category", id_category);
    if (error) {
      return res.status(500).json({
        message: "error cannot find category",
        error: error,
      });
    }
    return res.status(200).json({
      data: data,
      success: true,
      message: "category find",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const { data, error } = await supabase.from("category_items").select("*");
    if (error) {
      return res.json(error.message);
    }
    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
};
