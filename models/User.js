const mongoose=require('mongoose');
const validator=require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 45,
    validate: {
      validator: (v) => /^[A-Za-z\s]+$/.test(v),
      message: 'Name must contain only letters and spaces.',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: 'Invalid email format.',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'superAdmin', 'user'],
    default: 'user',
  },
}, { timestamps: true });

module.exports = mongoose.model('AuthUser', userSchema, 'authusers');

//module.exports = mongoose.model('User', userSchema);

