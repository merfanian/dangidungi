var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GroupSchema = new Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Group', GroupSchema);