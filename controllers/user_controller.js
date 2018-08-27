var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

exports.signup_post = function (req, res, next) {
    var hashedPhoneNum = bcrypt.hashSync(req.body.phoneNumber, config.salt);
    //todo : create verifier and send that to client.
    var verifier = 100;
    User.create({
        _id: hashedPhoneNum,
        username: req.body.username,
        name: req.body.name,
        //todo : change this verifier.
        verifier: verifier
    }, function (err, user) {
        if (err)
            res.status(500).send({signUp: false, verifier: null});
        else if (!user) {
            res.status(401).send({signUp: false, verifier: null});
        }
        else {
            res.status(200).send({signUp: true, verifier: verifier});
        }
    });
};

exports.login_post = function (req, res, next) {
    var hashedPhoneNum  = bcrypt.hashSync(req.body.phoneNumber , config.salt);

    User.findById(hashedPhoneNum, function (err, user) {
        if (err)
            return res.status(500).send({auth: false, token: null});
        else if (!user)
            return res.status(401).send({auth: false, token: null});

        if (!user.verifier === req.body.verifier)
            return res.status(401).send({auth: false, token: null});

        var token = jwt.sign({id: user._id}, config.secret);

        res.status(200).send({auth: true, token: token});
    });
};

exports.create_verifer_post = function (req, res) {
    var hashedPhoneNum = bcrypt.hashSync(req.body.phoneNumber, config.salt);
    var verifier = 100;
    User.findByIdAndUpdate(hashedPhoneNum, {verifier: verifier}, function (err, user) {
        if (err)
            res.status(500).send({verifier: null});
        else if (!user)
            res.status(401).send({verifier: null});
        else {
            res.status(200).send({verifier: verifier});
        }
    });
};

exports.logout_get = function (req, res, next) {
    res.status(200).send({auth: false, token: null});
};

exports.me_get = function (req, res, next) {
    console.log(req.userId);
    User.findById(req.userId, {password: 0}, function (err, user) {
        if (err)
            return res.status(500).send();
        if (!user)
            return res.status(401).send();

        res.status(200).send(user.toJSON());
    });
};

exports.verify_token = function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(401).send({auth: false, message: 'Failed to authenticate token.'});
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
};