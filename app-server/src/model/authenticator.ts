const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const authenticator = new Schema({
  phone: {
    type: String,
    required: [true, 'Phone Number is required']
  },
  otp: {
    type: Number,
  },
},{ timestamps: true });

//Export function to create "SomeModel" model class
module.exports = mongoose.model('authenticator', authenticator );
