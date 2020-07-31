const express = require('express');
const router = express.Router();
const { register, loginToBlog } = require('../controller/user');
const _ = require('lodash');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.post('/login', function(req, res, next) {
    loginToBlog(req.body)
        .then(result => {
            if (_.isObject(result)) {
                req.session.username = result.username
                req.session.realname = result.realname
                res.json(new SuccessModel('登录成功'));
                return
            }
            res.json(new ErrorModel(result));
        })
});

router.post('/logout', function(req, res, next) {
    req.session.username = null
    req.session.realname = null
    res.json(new SuccessModel('退出登录成功'));
});

router.post('/register', function(req, res, next) {
    register(req.body)
        .then(result => {
            if (_.isObject(result)) {
                req.session.username = req.body.username
                req.session.realname = req.body.realname
                res.json(new SuccessModel(result));
                return
            }
            res.json(new ErrorModel(result));
        })
        .catch(error => {
            res.json(new ErrorModel(error));
        })
});

router.get('/info', function(req, res, next) {
    const { username, realname } = req.session;
    res.json(new SuccessModel({
        userName: realname,
        userId: username
    }));
});

module.exports = router;