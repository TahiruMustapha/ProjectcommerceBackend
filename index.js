const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
// app.use(
//   cors({
//     origin: `${
//       process.env.NODE_ENV === "development"
//         ? process.env.FRONTEND_URL
//         : `${process.env.FRONTEND_URL_PRODUCTION}`
//     }`, // Allow frontend URLs
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // Allow sending cookies
//   })
// );
const allowedOrigins = [
 `${process.env.FRONTEND_URL}`, // Development URL
  `${process.env.FRONTEND_URL_PRODUCTION}`, // Production URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ Allow sending cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running " + PORT);
  });
});
