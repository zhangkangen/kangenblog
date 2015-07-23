/**
 * Created by 小康 on 2015/7/19.
 */
 var express = require('express');
 var Guokr = require('../models/guokr');
 var db = require('../models/db');
 var async = require('async');
 var router = express.Router();

 router.get('/', function (req, res, next) {
    db.driver.execQuery('select id,title,img from guokr order by id desc limit 10', function (err, list) {
        if (err) return err;
        res.render('guokr/main', {title: '谣言粉碎机', list: list});
    });
});

 router.get('/:id', function (req, res, next) {
    console.log(req.params.id);

    async.parallel({
        one:function(cb){
            if(req.params.id){
                Guokr.one({id:req.params.id},function(err,result){
                    if(err) cb(err);
                    cb(null,result);
                });
            }else{
                res.redirect('/guokr');
            }
        },
        two:function(cb){
            db.driver.execQuery('select id,title from guokr order by id desc limit 10',function(err,list){
                if(err) cb(err);
                cb(null,list);
            });
        }
    },function(err,result){
        if(err) throw err;
        if(result.one){
            res.render('guokr/content',{title:'谣言粉碎机--'+result.one.title, article:result.one,list:result.two});
        }else{
            res.redirect('/guokr');
        }
    });
});
 module.exports = router;