async function userLogout(req, res) {
  try {
    res.clearCookie("token", "",{
      path: "/",
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === "production" ? true : false,
      expires: new Date(0) // Set the expiration date to a past time (epoch)
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
