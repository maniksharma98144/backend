const router = require('express').Router();
const moment = require('moment');
module.exports = router;

const mongoose = require('mongoose');
const auth = require('../middleware/auth');

const Tweet = mongoose.model('tweets');

// endpoint to get all the tweets of the current user
/**
 * @swagger
 * /tweets/getAll:
 *    get:
 *      tags: 
 *        - Tweets
 *      description: get all the tweets by user
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          required: true
 *          type: string
 *          description: auth header
 *      responses:
 *          200:
 *              description: Ok
 *          422:
 *              description: error
 */
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

// endpoint to get tweet by id
/**
 * @swagger
 * /tweets/:_id:
 *    get:
 *      tags: 
 *        - Tweets
 *      description: get tweets by id
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          required: true
 *          type: string
 *          description: auth header
 *        - name: _id
 *          in : param
 *          type: string
 *          description: id of the tweet
 *      responses:
 *          200:
 *              description: Ok
 *          422:
 *              description: error
 */
router.get('/:_id', auth, async (req, res) => {
    const _id = req.params._id
    try {
        const tweet = await Tweet.findOne({ _id });
        res.status(200).json(tweet);
    } catch (err) {
        res.status(422).send(err);
    }
})

// endpoint to add a new tweet by the current user
/**
 * @swagger
 * /tweets/add:
 *    put:
 *      tags: 
 *        - Tweets
 *      description: add tweet
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          required: true
 *          type: string
 *          description: auth header
 *        - name: tweet
 *          in : body
 *          schema:
 *              type : object
 *              properties:
 *                  text:
 *                      type: string
 *          description: tweet text
 *      responses:
 *          200:
 *              description: Ok
 *          422:
 *              description: error
 */
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

// endpoint to update tweet by the current user
/**
 * @swagger
 * /tweets/update:
 *    post:
 *      tags: 
 *        - Tweets
 *      description: update tweet
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          required: true
 *          type: string
 *          description: auth header
 *        - name: tweet
 *          in : body
 *          schema:
 *              type : object
 *              properties:
 *                  _id:
 *                      type: string
 *                  text:
 *                      type: string
 *          description: tweet text
 *      responses:
 *          200:
 *              description: Ok
 *          422:
 *              description: error
 */
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

// endpoint to delete tweet by id
/**
 * @swagger
 * /tweets/delete/:_id:
 *    delete:
 *      tags: 
 *        - Tweets
 *      description: update tweet
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          required: true
 *          type: string
 *          description: auth header
 *        - name: _id
 *          in : param
 *          type: string
 *          description: id of the tweet
 *      responses:
 *          200:
 *              description: Ok
 *          422:
 *              description: error
 */
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
