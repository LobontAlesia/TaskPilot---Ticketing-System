const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'boards',
    },
  ],
});

module.exports = User = model('user', UserSchema);