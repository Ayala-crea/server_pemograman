require("dotenv").config();
const express = require("express");
const app = express();
const supabase = require('./config/db.js'); // Import supabase for the connection check
const authRoutes = require('./routes/authRoutes.js');
const itemRoutes = require('./routes/itemRoutes.js');

app.use(express.json());


app.use(authRoutes);
app.use(itemRoutes);

const port = process.env.APP_PORT || 5001;

app.listen(port, async () => {
  console.log(`Running server on port ${port}`);
  console.log(process.env.SUPABASE_KEY)
  
  // Check database connection
  const { error } = await supabase.from('users').select('id').limit(1);
  if (error) {
    console.error('Database connection failed:', error.message);
  } else {
    console.log('Database connected successfully');
  }
});
