const mongoose = require("mongoose");
const express = require("express");

const cors = require("cors");

const app = express();
const http = require("http").Server(app);

// middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT","head","PATCH","UPDATE"],
}));

// routes


// DB + Server start
mongoose
  .connect("mongodb+srv://tanavsortiqsolutions_db_user:TanavSortiq40232426182001@sortiqcluster.h1hpcfn.mongodb.net/")
  .then(() => {
    const PORT = 5003;
    http.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
