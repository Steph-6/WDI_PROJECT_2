const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const userSchema = mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true },
  email: { type: String, required: true },
  home: { type: String},
  passwordHash: { type: String, required: true }
});

userSchema
  .virtual('password')
  .set(setPassword);

userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

userSchema
  .path('passwordHash')
  .validate(validatePasswordHash);

userSchema.set('toJSON',{
  transform: function(doc, ret) {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});

userSchema.methods.validatePassword = validatePassword;

module.exports = mongoose.model('User', userSchema);

function setPassword(value){
  this._password    = value;
  this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

function validatePasswordHash() {
  if (this.isNew) {
    if (!this._password) {
      return this.invalidate('password', 'A password is required.');
    }

    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
}

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model('User', userSchema);
