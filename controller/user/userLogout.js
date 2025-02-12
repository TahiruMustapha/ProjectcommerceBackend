async function userLogout(req, res) {
  try {
    res.clearCookie("token", "",{
      path: "/",
      httpOnly: true,
      domain: process.env.NODE_ENV === 'production'? process.env.FRONTEND_URL_PRODUCTION: process.env.FRONTEND_URL,
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
