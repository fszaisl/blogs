const express = require('express');
const router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getBlogList } = require('../controller/bolg');


router.get('/list', function(req, res, next) {
    const { author = '', keyword = '' } = req.query;
    console.log(`11111111111111111111`, author, keyword)
    getBlogList(author, keyword)
        .then(rows => {
            res.json(new SuccessModel(rows))
        });
});


router.get('/detail', function(req, res, next) {
    res.json({
        title: '123123',
        conent: '123123'
    });
});


router.post('/new', function(req, res, next) {
    res.json({
        title: '123123',
        conent: '123123'
    });
});


router.post('/update', function(req, res, next) {
    res.json({
        title: '123123',
        conent: '123123'
    });
});


router.post('/delete', function(req, res, next) {
    res.json({
        title: '123123',
        conent: '123123'
    });
});

module.exports = router;