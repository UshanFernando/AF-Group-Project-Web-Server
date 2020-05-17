const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const wishListSchema = new Schema({
    user: { type: String},
    product: { type: String},
    quantity: { type: Number, required: true },
    //user: {type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    
});


module.exports = mongoose.model('wishList', wishListSchema);