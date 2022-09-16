const router = require('express').Router();
module.exports = router;


// api routes for users and tweets
const users = require('./users')
const tweets = require('./tweets')

router.use('/users', users);
router.use('/tweets', tweets);