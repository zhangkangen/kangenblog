/**
 * Created by 小康 on 2015/7/18.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('orm2', {title: 'ORM2学习'});
});

module.exports = router;