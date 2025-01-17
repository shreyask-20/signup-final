// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const userRoutes = require("./routes/userRoutes");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use("/api/users", userRoutes);

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log("Server running on http://localhost:${PORT}");
// });
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());
// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log("Server running on http://localhost:" + process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  });

// Routes
app.use("/api/users", userRoutes);