var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    _id: {type: String, required: true},
    username: {type: String, unique: true, trim: true, required: true},
    name: {type: String, required: true},
    verifier : {type : Number}
});

module.exports = mongoose.model('User', UserSchema);