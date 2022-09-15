const router = require('express').Router();
const moment = require('moment');
module.exports = router;

const mongoose = require('mongoose');
const auth = require('../middleware/auth');

const Tweet = mongoose.model('tweets');

router.get('/getAll', auth, async (req, res) => {
    const _user = req.user._id;
    try {
        const tweets = await Tweet.find({ _user })
        const updTweets = tweets.map((tweet) => {
            delete tweet._doc._user;
            tweet._doc.updatedAt = moment(tweet.updatedAt).format('DD/MM/yyyy') + '-' + moment(tweet.updatedAt).format('hh:mm:ss a');
            return tweet;
        });
        res.status(200).json(updTweets);
    } catch (err) {
        res.status(422).send(err);
    }
})

router.get('/:_id', auth, async (req, res) => {
    const _id = req.params._id
    try {
        const tweet = await Tweet.findOne({ _id });
        res.status(200).json(tweet);
    } catch (err) {
        res.status(422).send(err);
    }
})

router.put('/add', auth, async (req, res) => {
    const { text } = req.body;
    const _user = req.user._id;
    const tweet = new Tweet({
        _user,
        text
    });
    try {
        await tweet.save();
        res.status(200).send("tweet added");
    } catch (err) {
        res.status(422).send(err);
    }
})

router.post('/update', auth, async (req, res) => {
    const { _id, text } = req.body;
    try {
        await Tweet.findByIdAndUpdate(_id, { text })
            .then(response => {
                res.status(200).send("tweet updated");
            })
    } catch (err) {
        res.status(422).send(err);
    }
});

router.delete('/delete/:_id', auth, async (req, res) => {
    const _id = req.params._id;
    try {
        await Tweet.deleteOne({ _id })
            .then(response => {
                res.status(200).send("deleted")
            })
    } catch (err) {
        res.status(422).send(err);
    }
})
