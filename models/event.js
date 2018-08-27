var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventSchema = new Schema({
    _id: {type: String, required: true},
    groupId: {type: Schema.Types.ObjectId, ref: 'Group', required: true},
    name: {type: String, required: true},
    updateDate: {type: Number, required: true, default: Date.now()},
    removed: {type: Boolean, required: true, default: false}
});

module.exports = mongoose.model('Event', EventSchema);