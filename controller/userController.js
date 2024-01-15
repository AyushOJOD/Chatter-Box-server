const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const usernameCheck = await User.findOne({ userName });

    if (usernameCheck) {
      return res.json({ message: "Username already exists", staus: false });
    }

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.json({ message: "Email already exists", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return res.json({ user, status: true });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.json({
        message: "Incorrect Username or password",
        status: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "Incorrect Username or password",
        status: false,
      });
    }

    delete user.password;

    return res.json({ user, status: true });
  } catch (error) {
    next(error);
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    const userData = await User.findByIdAndUpdate(userId, {
      avatar: avatarImage,
      isAvatarSet: true,
    });

    return res.json({
      isSet: userData.isAvatarSet,
      image: userData.avatar,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "userName",
      "avatar",
      "_id",
    ]);

    return res.json({ users });
  } catch (error) {
    next(error);
  }
};
