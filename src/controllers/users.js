const Users = require('../repositories/users');
const { HttpCode } = require('../helpers/constants');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require("fs/promises");
const path = require("path");
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 8;

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res, next) => {
  try {
    const userEmail = await Users.findByEmail(req.body.email);
    if (userEmail) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Provided email already exists',
      });
    }

    const { id, name, email, phone, avatarURL, role } = await Users.create(
      req.body,
    );

    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    await Users.updateToken(id, token);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      user: { id, name, email, phone, avatarURL, role, token },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    const isValidPassword = await user?.isValidPassword(req.body.password);
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Email or password is wrong',
      });
    }
    const id = user.id;
    const { email, name, avatarURL, phone, role, country, city, address } = user;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    await Users.updateToken(id, token);
    return res.json({
      status: 'OK',
      code: HttpCode.OK,
      data: { token, id, email, name, phone, avatarURL, role, country, city, address },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json({ status: 'No Content' });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { name, email, phone, avatarURL, role, country, city, address } = await Users.findById(
      id,
    );
    return res.status(HttpCode.OK).json({
      status: 'OK',
      code: HttpCode.OK,
      user: { name, email, phone, avatarURL, role, country, city, address },
    });
  } catch (error) {
    next(error);
  }
};

const updateAccount = async (req, res, next) => {
  try {
    const userEmail = await Users.findByEmail(req.body.email);
    if (userEmail) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Provided email already exists',
      });
    }
    const id = req.user.id;
    const { name, email, phone, role, country, city, address } = await Users.updateAccount(id, req.body);
    return res.status(HttpCode.OK).json({
      status: 'OK',
      code: HttpCode.OK,
      user: { name, email, phone, role, country, city, address },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadAvatarService(process.env.PUBLIC_DIR);
    const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file });

    try {
      await fs.unlink(path.join(process.env.PUBLIC_DIR, req.user.avatarUrl));
    } catch (error) {
      console.log(error.message);
    }

    await Users.updateUserAvatar(id, avatarUrl);
    res.json({ status: "success", code: HttpCode.OK, data: { avatarUrl } });
  } catch (error) {
    next(error);
  }
};

const updateAccountPassword = async (req, res, next) => {
  try {
    const id = req.user.id;
    let password = req.body.password;
    let repeatPassword = req.body.repeatPassword;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    password = await bcrypt.hash(password, salt);
    repeatPassword = await bcrypt.hash(repeatPassword, salt);
    await Users.updateAccountPassword(id, password, repeatPassword);
    return res.status(HttpCode.OK).json({
      status: 'OK',
      code: HttpCode.OK,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateAccount,
  updateAccountPassword,
  updateUserAvatar,
};
