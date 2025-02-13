const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error("Invalid password");
    }

    // Remove password before sending user details
    const { password: _, ...userData } = user.toObject();

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "8h" }
    );

    const isProduction = process.env.NODE_ENV === "production";
    const domain = isProduction ? ".spectacular-kleicha-d2752f.netlify.app" : undefined; // Correct domain handling

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction, // Only secure in production
        sameSite: isProduction ? "Lax" : "Lax",
        domain: domain,  // Use the dynamically determined domain
        path: "/",
      })
      .status(200)
      .json({
        message: "Login successfully",
        user: userData,
        success: true,
      });
  } catch (err) {
    res.status(400).json({
      message: err.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
