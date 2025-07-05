const mongoose = require('mongoose')

const vlogSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users' 
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Vlog', vlogSchema);

