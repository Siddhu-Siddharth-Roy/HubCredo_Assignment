const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes= require("./routes/auth");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://stately-khapse-6ab958.netlify.app",
  methods: "GET,POST",
}));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Error:", err));
app.use("/api/auth",authRoutes);

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));