const { Schema, model } = require('mongoose');

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  label: {
    type: String,
  },
  priority: {
    type: String,
    required: true,
    default: 'low',
  },
  deadline: {
    type: Date,
    default: null,
  },
  members: [
    {
      _id: false,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  checklist: [
    {
      text: {
        type: String,
      },
      complete: {
        type: Boolean,
      },
    },
  ],
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = Card = model('card', CardSchema);