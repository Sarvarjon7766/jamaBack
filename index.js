const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://smart-farm-jqi2.onrender.com", // Frontend manzili
  methods: ["GET", "POST"],        // Faqatgina GET va POST so‘rovlariga ruxsat beradi
  credentials: true,               // Cookie va boshqa maxfiy ma'lumotlar yuborilishi mumkin
}));

app.use(express.json());           // JSON formatdagi so'rovlarni o‘qishga imkon beradi


const dhtRoutes = require("./routes/dhtRoutes");
const relayRoutes = require("./routes/relayRoutes");

app.use("/dht", dhtRoutes);
app.use("/relay", relayRoutes);
const MONGO_URI='mongodb+srv://sarvar:sarvar@cluster0.sq5rmxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


mongoose.connect(MONGO_URI)
    .then(() => app.listen(5000,"0.0.0.0" ,() => console.log(`Server running on port ${process.env.PORT}`)))
    .catch(error => console.log(`${error} did not connect`));

