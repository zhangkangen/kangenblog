/**
 * Created by 小康 on 2015/7/19.
 */
 var express = require('express');
 var utility = require('utility');
 var db = require('../models/db');
 var User = require('../models/user');
 var Article = require('../models/article');
//var logger = require('../app').logger('one');
var async = require('async');
var router = express.Router();

router.get('/:id', function (req, res, next) {
    if (!req.params.id) {
        next();
    } else {
        // db.models.article.one({id: req.params.id}, function (err, result) {
        //     if (err) throw err;
        //     if (!result) {
        //         res.redirect('/one');
        //     }
        //     db.driver.execQuery('select id,title from article limit 10', function (err, results) {
        //         if (err) throw  err;
        //         res.render('one/content', {article: result, list: results});
        //     });
        // });
        async.parallel({
            one:function(cb){
                Article.findById(req.params.id)
                    .then(function(result){
                        if(result)
                            cb(null,result);
                        else{
                            cb(true);
                        }
                    });
            },
            two:function(cb){
                Article.findAll({
                    limit:10,
                    order:'id desc',
                    attributes:['id','title']
                }).then(function(results){
                    cb(null,results);
                });
            }
        },function(err,result){
            if(err){ 
                console.log(err);
                res.redirect('/one');
            }else{
                res.render('one/content',{
                    title:result.one.title,
                    article:result.one,
                    list:result.two
                });
            }
        });
    }
});

router.get('/', function (req, res, next) {
    Article.findAll({
        limit: 10,
        order: 'id desc',
        attributes:['id','title']
    }).done(function (results) {
        console.log(results);
        res.render('one/one',{data:results})
    });
});

module.exports = router;