// User Schema for atabase
// It should grap the facebook id as string
const mongoose = require('mongoose');
const { Schema } = mongoose;

// The userSchema will contain facebook id, Name and if the user is admin
// admin will be settled with first deployment
// and then settled by specific panel
const userSchema = new Schema({
  facebookID: String,
  name: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// link the schema with model users
mongoose.model('users', userSchema);
