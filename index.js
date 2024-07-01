require("dotenv").config();
const express = require("express");
const app = express();
const supabase = require('./config/db.js'); // Import supabase for the connection check
const authRoutes = require('./routes/authRoutes.js');
const itemRoutes = require('./routes/itemRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const configureMiddleware = require('./middleware/cors.js');

app.use(express.json());

// Terapkan middleware CORS dan lainnya
configureMiddleware(app);

app.use(authRoutes);
app.use(itemRoutes);
app.use(categoryRoutes);
app.use(orderRoutes);

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
