require("dotenv").config();
require("../config/database").connect();
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
//import user context
const { User } = require("../model");
const router = express.Router();
const auth = require("../middleware/auth");



/**
 * @description register a new user
 * check is user already exist
 */
router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if(!(email && password && first_name && last_name)) {
            res.status(400).send("Fill all the inputs!");
        }
        const registeredUser = await User.findOne({ email });
        if(registeredUser) {
            return res.status(409).send("User already exists. Please try another mail");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        user.token = token;
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }
});

router.get("/currentUser", auth, async (req, res) => {
    const user = await User.findById(req.ctx.user_id);
    if (!user)
        return res.sendStatus(404);
    res.json(user);
});

/**
 * @description login route
 */
router.post("/login", async (req, res) => {
    try {
        //get user input
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!(email && password)) {
            res.status(400).send("Fill all the inputs!");
        }
        if (!user)
            return res.status(404).send('User not found.');
        if (!(await bcrypt.compare(password, user.password)))
            return res.status(400).send('Invalid credentials.');
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: '24h'});
        res.cookie('x-access-token', token, { expires: new Date(Date.now() + 86400000), httpOnly: true, secure: true, sameSite: 'none' });
        user.token = token;
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});

router.get("/logout", auth, async (req, res) => {
    res.clearCookie('x-access-token').sendStatus(200);
    console.log("successfully logged out")
});


module.exports = router;