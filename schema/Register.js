const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const RegisterSchema = new Schema({
    utype: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: Number, required: true},
});

const Reister=mongoose.model('comments',RegisterSchema);
module.exports = mongoose.model('comment', RegisterSchema);