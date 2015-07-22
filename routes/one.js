/**
 * Created by 小康 on 2015/7/19.
 */
var express = require('express');
var utility = require('utility');
var db = require('../models/db');
var User = require('../models/user');
var Article = require('../models/article');
//var logger = require('../app').logger('one');
var router = express.Router();

router.get('/:id', function (req, res, next) {
    if (!req.params.id) {
        next();
    } else {
        db.models.article.one({id: req.params.id}, function (err, result) {
            if (err) throw err;
            if (!result) {
                res.redirect('/one');
            }
            db.driver.execQuery('select id,title from article limit 10', function (err, results) {
                if (err) throw  err;
                res.render('one/content', {article: result, list: results});
            });
        });
    }
});

router.get('/', function (req, res, next) {
    db.driver.execQuery('select id,title from article', function (err, results) {
        if (err) throw  err;
        res.render('one/one', {title: 'one', data: results});
    });
});

module.exports = router;