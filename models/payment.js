var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PaymentSchema = new Schema({
    _id: {type: String, required: true},
    eventId: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
    groupId: {type: Schema.Types.ObjectId, ref: 'Group', required: true},
    payInfos: [{type: Schema.Types.ObjectId, ref: 'PayInfo'}],
    consumeInfos: [{type: Schema.Types.ObjectId, ref: 'ConsumeInfo'}],
    removed: {type: Boolean, required: true, default: false},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    updateDate: {type: Number, default: Date.now(), required: true}
});

module.exports = mongoose.model('Payment', PaymentSchema);