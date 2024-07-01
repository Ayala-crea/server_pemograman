const express = require("express");
const app = express();
const supabase = require("../config/db.js");
const configureMiddleware = require("../middleware/cors.js");
// Terapkan middleware CORS dan lainnya
configureMiddleware(app);

exports.createOrder = async (req, res) => {
  const { id_items, quantitiy_order } = req.body;
  const id_pengguna = req.userId;
  try {
    const { data, error } = await supabase
      .from("Order")
      .insert({
        id_pengguna: id_pengguna,
        id_items: id_items,
        quantitiy_order: quantitiy_order,
      })
      .select("*");

    if (error) {
      return res.status(500).json({
        message: "gagal",
        error: error,
      });
    }

    return res.status(200).json({
      data: data,
      success: true,
      message: "berhasil membuat order",
    });
  } catch (error) {}
};

exports.getOrderById = async (req, res) => {
  let id_pengguna = req.users.id;
  try {
    const { data, error } = await supabase
      .from("Order")
      .select("*")
      .eq("id_pengguna", id_pengguna);

      if (error) {
        return res.json(error.message);
      }

      return res.status(200).json({
        data: data,
        success: true,
        message: "data finded"
      })
  } catch (error) {
    return res.json(error);
  }
};
