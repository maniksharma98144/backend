const mongoose = require('mongoose');
const { Schema } = mongoose;

const tweetSchema = new Schema({
    _user: Schema.Types.ObjectId,
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

mongoose.model('tweets', tweetSchema);