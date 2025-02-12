const checkAuth = async (req, res) => {
  res.json({ isAuthenticated: !!req.cookies.token });
};

module.exports = checkAuth;
