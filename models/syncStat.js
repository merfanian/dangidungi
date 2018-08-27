var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SyncStatSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        dbId: {type: String, required: true},
        syncTime: {type: Number, required: true},
        syncReqTime: {type: Number}
    }
);

module.exports = mongoose.model('SyncStat', SyncStatSchema);