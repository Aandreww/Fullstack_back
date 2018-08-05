const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utilis/errorHandler');
const User = require('../models/User');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        // Check password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

        if (passwordResult) {
            // Generating token and login in
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            // Password is incorrect
            res.status(401).json({
                message: 'Password is incorrect. Try again.'
            });
        }
    } else {
        // User not exist
        res.status(404).json({
            message: 'User with this email not found.'
        });
    }
};

module.exports.register = async function (req, res) {
    // email password
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        //User exist
        res.status(409).json({
            message: 'This email is already in use. Try another one. And another one.'
        });
    } else {
        // Create User
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            errorHandler(res, e);
        }
    }
};