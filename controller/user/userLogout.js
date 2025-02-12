async function userLogout(req, res) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const domain = isProduction ? ".spectacular-kleicha-d2752f.netlify.app" : undefined; // Dynamic domain
    const sameSite = isProduction ? "None" : "Lax"; // Conditional sameSite
    const secure = isProduction; // Secure only in production

    res.clearCookie("token", {
      httpOnly: true,
      domain: domain, // Use the dynamically determined domain
      sameSite: sameSite,
      secure: secure,
      path: "/",
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
