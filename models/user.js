const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Now this will automatically add a username and password field and check for unique usernames and have some pre-defined functions as well.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);