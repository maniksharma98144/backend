const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema for tweet
const tweetSchema = new Schema({
    _user: Schema.Types.ObjectId,
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

mongoose.model('tweets', tweetSchema);