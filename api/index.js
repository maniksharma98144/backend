const router = require('express').Router();
module.exports = router;

const users = require('./users')
const tweets = require('./tweets')

router.use('/users', users);
router.use('/tweets', tweets);