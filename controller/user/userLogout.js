async function userLogout(req, res) {
  const isProduction = process.env.NODE_ENV === "production";

  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction, // Only secure in production
      sameSite: isProduction ? "none" : "lax", // Use "none" in production, "lax" in development
      path: "/", // Ensure the cookie is accessible across the entire domain
    });

    res.json({
      message: "Logged out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogout;
