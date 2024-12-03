const logoutUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'You are not logged in',
      });
    }

    res.clearCookie('token').json({
      status: 200,
      message: 'You have been logged out',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logoutUser;
