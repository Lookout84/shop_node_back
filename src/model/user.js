const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { Roles } = require('../helpers/constants');
const SALT_WORK_FACTOR = 8;


const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: [true, 'Enter your name'],
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    repeatPassword: {
      type: String,
      required: [true, 'Confirm password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please fill a valid email address'],
    },
    token: { type: String, default: null },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true);
      },
    },
    role: {
      type: Array,
      default: Roles[1],
    },
    phone: {
      type: String,
      required: [true, 'Вкажіть номер телефону, наприклад: +380991234567'],
    },
    country: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    this.repeatPassword = await bcrypt.hash(this.repeatPassword, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
