const router = require('express').Router();
const bcrypt = require('bcryptjs');
module.exports = router;

const mongoose = require('mongoose');
const User = mongoose.model('users');

// endpoint for signIn
/**
 * @swagger
 * /users/signIn:
 *    get:
 *      tags: 
 *        - Users
 *      description: signIn user
 *      parameters:
 *        - name: userId
 *          in: query
 *          required: true
 *          description: userId
 *          schema:
 *              type : string
 *        - name: password
 *          in: query
 *          required: true
 *          description: password
 *          schema:
 *              type : string
 *      responses:
 *          200:
 *              description: Ok
 *          422:
 *              description: error
 */
router.get('/signIn', async (req, res) => {
    const { userId, password } = req.query;
    try {
        const user = await User.findOne({ userId });
        if (!user) {
            throw new Error();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error();
        }
        const token = await user.generateAuthToken();
        res.status(200).send({ _user: token });
    } catch (err) {
        res.status(422).send('User not Found');
    }
});

// endpoint for signUp
/**
 * @swagger
 * /users/signUp:
 *    post:
 *      tags: 
 *        - Users
 *      description: signUp user
 *      parameters:
 *        - in: body
 *          name: user
 *          description: user to create
 *          schema:
 *              type : object
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  userId:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          200:
 *              description: Ok
 *          422:
 *              description: error
 */
router.post('/signUp', async (req, res) => {
    const { firstName, lastName, userId, password } =
        req.body;
    const user = new User({
        firstName,
        lastName,
        userId,
        password
    });
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).send({ _user: token });
    } catch (err) {
        res.status(422).send(err);
    }
});
