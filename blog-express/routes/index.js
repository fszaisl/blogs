var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({
        title: '123123',
        conent: '123123'
    });
});

module.exports = router;