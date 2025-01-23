import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    default: '/public/chibi.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

userSchema.statics.signup = async function (email, password, nickname) {
  try {
    if (!email || !password || !nickname) {
      throw new Error('Please fill all the fields!');
    }

    if (!validator.isEmail(email)) {
      throw new Error('E-mail format is not correct.');
    }

   if (!validator.isStrongPassword(password)) {
      throw new Error('The password is not strong enough.');
    }

    const emailExists = await this.findOne({ email });
    if (emailExists) {
      throw new Error('The email is already taken.');
    }

    const nicknameExists = await this.findOne({ nickname });
    if (nicknameExists) {
      throw new Error('The nickname is already taken.');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, nickname });

    return user;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('Please fill all the fields!');
  }

  try {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Invalid email or password.');
    }

    return user;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
};

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
