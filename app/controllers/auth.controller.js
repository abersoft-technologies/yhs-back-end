const { authService } = require('../services');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const result = await authService.login(email, password);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Succesfully logged in',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const signup = async (req, res, next) => {
  try {
    const result = await authService.signup(req.body);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Succesfully signed up',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

module.exports = {
  login,
  signup,
};
