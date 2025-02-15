const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Suggestion'
  }],
  location: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

// Named function for password comparison
async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
}

// Named function for password hashing
async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
}

userSchema.methods.comparePassword = comparePassword;
userSchema.pre('save', hashPassword);

const User = mongoose.model('User', userSchema);

module.exports = User; 