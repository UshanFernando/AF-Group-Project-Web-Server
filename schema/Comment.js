const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const commentSchema = new Schema({
    name: { type: String},
    message: { type: String},
    rating: { type: Number, required: true },
    user: {type: mongoose.Types.ObjectId, required: true, ref: 'register' },
    //user: {type: Number, required: true},
});


module.exports = mongoose.model('comment', commentSchema);