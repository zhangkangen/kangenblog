/**
 * Created by 小康 on 2015/7/19.
 */
var express = require('express');
var db = require('../models/db');
var router = express.Router();

router.get('/', function (req, res, next) {
    db.driver.execQuery('select id,title,img from guokr order by id limit 10', function (err, list) {
        if (err) return err;
        res.render('guokr/main', {title: '谣言粉碎机', list: list});
    });
});

router.get('/:id', function (req, res, next) {
    console.log(req.params.id);
    db.models.guokr.one({id: req.params.id}, function (err, result) {
        if (err) throw err;
        if (result) {
            db.driver.execQuery('select id,title from guokr order by id limit 10', function (err, list) {
                if (err) throw err;
                res.render('guokr/content', {title: '谣言粉碎机', article: result, list: list});
            });
        } else {
            res.redirect('/');
        }
    });
});
module.exports = router;