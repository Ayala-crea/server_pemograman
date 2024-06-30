const express = require("express");
const app = express();
const supabase = require("../config/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Ensure bcrypt is imported
const configureMiddleware = require('../middleware/cors.js');
// Terapkan middleware CORS dan lainnya
configureMiddleware(app);

exports.register = async (req, res) => {
  const { full_name, nickname, email, phone_number, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    const { data, error } = await supabase
      .from("users")
      .insert({
        full_name,
        nickname,
        email,
        phone_number,
        password: hashedPassword,
        role_id: 2, // Assuming 2 is the role for regular users
        is_active: true // Assuming you want to set the user as active by default
      })
      .select("*");

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const userId = data[0].id;
    return res.status(201).json({ success: true, message: "Berhasil Register!" , userId, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
    const { usernameEmail, password } = req.body;
    
    // Validate the request body
    if (!usernameEmail || !password) {
      return res.status(400).json({ success: false, message: "Username/Email and password are required." });
    }
  
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*, roles(*)")
        .or(`nickname.eq.${usernameEmail}, email.eq.${usernameEmail}`);
  
      if (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
  
      if (data.length === 0) {
        return res.status(404).json({ success: false, message: "User doesn't exist" });
      }
  
      const user = data[0];
  
      // Compare the password
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) {
          return res.status(500).json({ success: false, message: err.message });
        }
  
        if (response) {
          const getToken =
            process.env.JWT_TOKEN ||
            "gf0tzbRgE0kRy1e8Ye643dEEATVYIGFzBYx8oGGK79a6PQmcEPqSKaP06BJHMu6SwTKxE1pOTVGTvjUwKqFMc8WCmuofxX51zacleZ5utjU6TLYojmlqvQbBxDu0JtR845lmDEVlIcK6vIhmfUTlGe9ZJ0irhhEwxPlu8SWrzXk3Z1tpsadzYSlikXVQE3IHMrp0Q4ioCfuT4pouoYGIb1tgy7Dl7aoLAMPShBvyABhIB3Geedvy9dgVlHKAvk1a";
          const token = jwt.sign(
            { id: user.id, roles: user.roles.roles },
            getToken,
            { expiresIn: "24h" }
          );
  
          return res.status(200).json({
            success: true,
            message: `Welcome to Dashboard Data Barang, ${user.nickname}`,
            loggedIn: true,
            token: token,
            dataUser: user,
            roles: user.roles.roles,
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Wrong username/email or password combination!",
            loggedIn: false,
            isValid: false,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
