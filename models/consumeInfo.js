var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ConsumrInfoSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    share: {type: Number, required: true}
});

module.exports = mongoose.model('ConsumeInfo' , ConsumrInfoSchema);