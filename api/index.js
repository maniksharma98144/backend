const router = require('express').Router();
module.exports = router;

router.get('/', (req, res) => {
    res.send("Kindly use the respective APIs, go to: /api-docs");
})

// api routes for users and tweets
const users = require('./users')
const tweets = require('./tweets')

router.use('/users', users);
router.use('/tweets', tweets);