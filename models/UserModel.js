var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserModel = mongoose.model('User', new Schema({
    username: {type: String, required: [true, 'username is required']},
    email: {type: String, required: [true, 'email is required']},
    password: {type: String, required: [true, 'password is required']},
    personnalInfo: {type: String}
}, {
    strict: true
})
);

module.exports = UserModel;