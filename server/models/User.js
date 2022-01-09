const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: String,
  image: String,
  status: String
});

module.exports = model('User', userSchema)