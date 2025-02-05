const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
app.use(cors({
    origin: ["https://spectacular-kleicha-d2752f.netlify.app", "http://localhost:3000"], // Allow both frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    credentials: true // Allow cookies and authorization headers
}));
app.use(express.json());
app.use(cookieParser());

// Set cookies with SameSite and Secure attributes
app.use((req, res, next) => {
    res.cookie("token", "your-token-value", {
      httpOnly: true,
      secure: true, // Ensure this is true in production (HTTPS only)
      sameSite: "none", // Required for cross-origin cookies
    });
    next();
  });

app.use("/api", router);

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running " + PORT);
  });
});
