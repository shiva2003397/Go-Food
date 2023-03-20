const express = require("express");
const app = express();

const mongoDBconnect = require("./db");
mongoDBconnect();

app.listen(5000 , function () {
  console.log("Server is Running on Port 3000!");
})

app.get("/" , function (req , res) {
  res.send("Hello!");
})


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json())

app.use("/api" , require("./Routes/Createruser"));

app.use("/api" , require("./Routes/Displaydata"));

app.use("/api" , require("./Routes/OrderData"));

app.post("/" , function (req , res) {
    res.send("Hello!");
})