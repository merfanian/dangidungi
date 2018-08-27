var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PayInfoSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    amount: {type: Number, required: true}
});

module.exports = mongoose.model('PayInfo' , PayInfoSchema);