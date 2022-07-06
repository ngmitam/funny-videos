const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Used to generate password hash
const SALT_WORK_FACTOR = 10;
const bcryptSalt = bcrypt.genSaltSync(SALT_WORK_FACTOR);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    es_indexed: true,
  },
  password: { type: String, required: true },
  disabled: {
    default: false,
    type: Boolean,
    es_indexed: true,
  },
  createdAt: {
    type: Number,
    default: () => Math.round(Date.now() / 1000),
    es_indexed: true,
  },
});

// Middleware executed before save - hash the user's password
// eslint-disable-next-line consistent-return
UserSchema.pre('save', function save(next) {
  const self = this;

  // only hash the password if it has been modified (or is new)
  if (!self.isModified('password')) return next();
  try {
    // hash the password using our new salt
    const hash = bcrypt.hashSync(self.password, bcryptSalt);
    // override the cleartext password with the hashed one
    self.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

// Test candidate password
UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword
) {
  const self = this;
  return bcrypt.compareSync(candidatePassword, self.password);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Export user model
module.exports = User;
