const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
app.use(cors({
    origin: ["https://spectacular-kleicha-d2752f.netlify.app", "http://localhost:3000"], // Allow frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true  // Allow sending cookies
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api", router);

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running " + PORT);
  });
});
