async function userLogout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      // domain:
      //   process.env.NODE_ENV === "production"
      //     ? ".spectacular-kleicha-d2752f.netlify.app" // Frontend domain (with leading dot for subdomains)
      //     : undefined,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      // expires: new Date(0) // Set the expiration date to a past time (epoch)
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
