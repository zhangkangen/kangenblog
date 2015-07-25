/**
 * Created by 小康 on 2015/7/17.
 */
 var express = require('express'),
 superagent = require('superagent'),
 cheerio = require('cheerio'),
 db = require('../models/db'),
 Article = require('../models/article'),
 Guokr = require('../models/guokr'),
 async = require('async'),
 router = express.Router();

 router.get('/', function (req, res, next) {
    async.waterfall([
        function (callback) {
            superagent.get('http://wufazhuce.com/one')
            .end(function (err, sres) {
                if (err) callback(err);
                callback(null, sres);
            });
        }, function (arg1, callback) {
            var $ = cheerio.load(arg1.text, {decodeEntities: false});
            var href = $('.one-titulo').find('a').attr('href');
            Article.count({where:{href:href}}).then(function(c){
                if(c===0){
                    callback(null,href);
                }else{
                    callback('文章已存在');
                }
            });

            // db.models.article.exists({href: href}, function (err, res) {
            //     if (err) callback(err);
            //     callback(null, res, href);
            // });
}, function (href, callback) {
    superagent.get(href).
    end(function (err, sres) {
        if (err) callback(err);
        var $c = cheerio.load(sres.text, {decodeEntities: false});
        var title = $c('.articulo-titulo').text();
        var author = $c('.articulo-autor').html();
        var content = $c('.articulo-contenido').html();
        var img = $c('.one-imagen').find('img').attr('src');
        console.log('图片地址' + img);
        var article = {
            href: href,
            author: author,
            title: title,
            content: content,
            img: img
        };
        Article.create(article).then(function(result){
            if(result){
                callback(null,result);
            }else{
                callback('保存失败');
            }
        });
    });
}
], function (err, result) {
    if (err) {
        console.log(err);
        res.send(err);
    } else {
        console.log(result);
        res.send('文章保存成功:<a href="/one/' + result.id + '">' + result.title + '</a>');
    }
});
});
/**
 * 获取果壳谣言粉碎机内容
 */
 router.get('/guokr', function (req, res, next) {
    superagent.get('http://www.guokr.com/scientific/channel/fact/')
    .end(function (err, sres) {
        if (err) throw err;
        var $ = cheerio.load(sres.text, {decodeEntities: false});
        var items = [];
        //获取到文章 href 和封面 img
        $('.article').each(function (index, element) {
            var $element = $(element);
            var href = $element.find('.article-title').attr('href');
            var img = $element.find('img').first().attr('src');
            if(href){
                items.push({img:img,href:href});
            }
        });
        console.log(items.length);
        //过滤数据库中已存在 href
        async.reject(items,function(item,cb){
            Guokr.count({where:{href:item.href}}).then(function(c){
                 cb(c);
            });

        },function(results){
            console.log(results);
            async.each(items,function(item,cb){
                superagent.get(item.href).end(function(err,sres){
                    var $c = cheerio.load(sres.text, {decodeEntities: false});
                        var href = item.href;
                        var img = item.img;
                        var title = $c('#articleTitle').text();
                        var author = $c('.content-th-info a').html();
                        var content = $c('.document').html();
                        var copyright = $c('.copyright').html();

                    cb(null);
                });
            },function(err){
                console.log(err);
            });
        });

        res.send('ok');
    });
});

 module.exports = router;