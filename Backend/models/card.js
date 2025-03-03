const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength:30
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
    // validate:{}
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  likes: {
    type: [{type: mongoose.Schema.Types.ObjectId}],
    default: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const card = mongoose.model("card", cardSchema);
module.exports = card;
