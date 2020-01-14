const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const colors = require("colors");
require("dotenv/config");
const app = express();

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

//ROUTES IMPORT
const postRoute = require("./routes/posts");

app.use("/posts", postRoute);

//MAIN ROUTE
app.get("/", (req, res) => {
  res.send("Home");
});

//DATABASE CONNECT
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Succesfully connected to DataBase".green.underline);
  }
);

app.listen(3000);
