/**
 * Created by 小康 on 2015/7/19.
 */
 var express = require('express');
 var Guokr = require('../models/guokr');
 var Sequelize = require('sequelize');
 var async = require('async');
 var router = express.Router();

 router.get('/:id', function (req, res, next) {
    console.log(req.params.id);
    if(!req.params.id){
        next();
    }
    async.parallel({
        one:function(cb){
            if(req.params.id){
                Guokr.findById(req.params.id).then(function(result){
                    cb(null,result);
                });
            }else{
                res.redirect('/guokr');
            }
        },
        two:function(cb){
            Guokr.findAll({
                limit:10,
                order:'id desc',
                attributes:['id','title']
            }).then(function(results){
                cb(null,results);
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

 router.get('/', function (req, res, next) {
    Guokr.findAll({
        limit:12,
        order:'id desc',
        attributes:['id','title','img']
    }).then(function(results){
        if(results.length==0){
            res.redirect('/');
        }else{
            res.render('guokr/main',{title:'谣言粉碎机',list:results});
        }
    });
});


 module.exports = router;