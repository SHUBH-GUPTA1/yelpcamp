const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username:String
});

UserSchema.plugin(passportLocalMongoose);          //it will add username&password

const User = mongoose.model('User', UserSchema);  
const newUser = new User({ username: 'Password' }); 
 newUser.setPassword('Password', (err) => {
 if (err) {
  console.error(err);
 } else {
  console.log('Password set successfully!');
  console.log('User:', newUser);
 }
});

module.exports = mongoose.model('User', UserSchema);

