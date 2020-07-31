const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getBlogList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/bolg');


router.get('/list', function(req, res, next) {
    const { author = '', keyword = '' } = req.query;
    getBlogList(author, keyword)
        .then(rows => {
            res.json(new SuccessModel(rows))
        });
});


router.get('/detail', function(req, res, next) {
    const { id } = req.query;
    getDetail(id)
        .then(data => {
            res.json(new SuccessModel(data))
        });
});


router.post('/new', function(req, res, next) {
    req.body.author = 'lisi'
        // console.log(req.body)
    newBlog(req.body)
        .then(result => {
            if (_.isObject(result)) {
                res.json(new SuccessModel(result));
                return
            }
            res.json(new ErrorModel(result));
        })
});


router.post('/update', function(req, res, next) {
    req.body.author = 'lisi'
    updateBlog(req.body)
        .then(reslut => {
            if (reslut) {
                res.json(new SuccessModel('博客更新成功'))
                return
            }
            res.json(new SuccessModel('博客更新失败'))
        })
});


router.post('/delete', function(req, res, next) {
    req.body.author = 'lisi'
    console.log(req.session)

    delBlog(req.body)
        .then(reslut => {
            if (reslut) {
                res.json(new SuccessModel('博客删除成功'))
                return
            }
            res.json(new SuccessModel('博客删除失败'))
        })
});

module.exports = router;