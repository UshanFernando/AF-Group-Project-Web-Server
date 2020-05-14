const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const commentSchema = new Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true },
    //user: {type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    user: {type: Number, required: true},
});

const Category=mongoose.model('comments',commentSchema);
module.exports = mongoose.model('comment', commentSchema);