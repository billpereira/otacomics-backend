const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	facebookID: String,
});

mongoose.model('users', userSchema);
