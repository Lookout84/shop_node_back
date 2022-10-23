const User = require('../model/user');

const findById = async id => {
  return await User.findById(id);
};

const findByName = async name => {
  return await User.findOne({ name });
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const create = async body => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAccount = async (id, body) => {
  const result = await User.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  return result;
};

const updateAccountPassword = async (id, password, repeatPassword) => {
  const result = User.updateMany({ _id: id }, { password, repeatPassword });
  return result;
};

const updateUserAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL });
};

module.exports = {
  findById,
  findByEmail,
  findByName,
  create,
  updateToken,
  updateAccount,
  updateAccountPassword,
  updateUserAvatar,
};
