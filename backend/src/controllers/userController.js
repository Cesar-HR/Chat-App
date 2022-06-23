const user = require("./../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await user.findOne({ username });
    const emailCheck = await user.findOne({ email });

    if (usernameCheck) {
      return res.json({
        status: false,
        message: "Username already used. Please choose another one.",
      });
    }

    if (emailCheck) {
      return res.json({
        status: false,
        message: "The email has already an account.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const data = await user.create({ username, email, password: hashPassword });
    delete data.password;

    return res.json({ status: true, message: "User has been created!", data });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const data = await user.findOne({ username });

    if (!data) {
      return res.json({
        status: false,
        message: "Incorrect username.",
      });
    }

    const passwordCheck = await bcrypt.compare(password, data.password);

    if (!passwordCheck) {
      return res.json({
        status: false,
        message: "Incorrect password.",
      });
    }

    delete data.password;

    return res.json({
      status: true,
      message: "User connected successfully!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const _userId = req.params.id;
    const data = await user.findByIdAndUpdate(
      _userId,
      {
        isAvatarImageSet: true,
        avatarImage: req.body.image,
      },
      { new: true }
    );

    return res.json({
      status: true,
      message: "Avatar picture set successfully!",
      data,
    });
  } catch (error) {
    next(error);
  }
};
