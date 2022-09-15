const router = require('express').Router();
module.exports = router;

const users = require('./users')
const tweets = require('./tweets')

router.get('/', (req, res) => {
    res.send("server working")
})

router.use('/users', users);
router.use('/tweets', tweets);