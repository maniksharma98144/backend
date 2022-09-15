const mongoose = require('mongoose');
const { Schema } = mongoose;

const tweetSchema = new Schema({
    _user: Schema.Types.ObjectId,
    text: {
        type: String,
        required: true
    }
}, { timestamp: true });

mongoose.model('tweets', tweetSchema);