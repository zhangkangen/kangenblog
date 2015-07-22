var express = require('express');
var utility = require('utility');
var db = require('../models/db');
var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
/*这是登录页面*/
router.get('/login', function (req, res, next) {
    res.render('login', {title: '登录'});
});

router.get('/reg', function (req, res, next) {
    res.render('reg', {title: '注册'});
});
router.get('/logout', function (req, res, next) {
    if (req.session.user) {
        req.session.user = null;
    }
    res.redirect('/');
});

router.post('/login', function (req, res, next) {

    res.send('这是登录的提交地址');
});

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '用户未登录');
        return res.redirect('/users/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if(req.session.user){
        req.flash('error','用户已登录');
        return res.redirect('/');
    }
    next();
}

module.exports = router;
