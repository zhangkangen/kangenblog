/**
 * Created by 小康 on 2015/7/17.
 */
var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var db = require('../models/db');
var Article = require('../models/article');
var async = require('async');
var router = express.Router();

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
            db.models.article.exists({href: href}, function (err, res) {
                if (err) callback(err);
                callback(null, res, href);
            });
        }, function (res, href, callback) {
            if (res) {
                superagent.get(href).
                    end(function (err, sres) {
                        if (err) callback(err);
                        var $c = cheerio.load(sres.text, {decodeEntities: false});
                        var title = $c('.articulo-titulo').text();
                        var author = $c('.articulo-autor').html();
                        var content = $c('.articulo-contenido').html();
                        var img = $c('.one-imagen').find('img').attr('src');
                        console.log('图片地址' + img);
                        var article = new Article({
                            href: href,
                            author: author,
                            title: title,
                            content: content,
                            img: img
                        });
                        article.save(function (err, result) {
                            if (err) callback(err);
                            callback(null, result);
                        });
                    });
            } else {
                callback('已存在:' + href);
            }
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
            $('.article').each(function (index, element) {
                var $element = $(element);
                var href = $element.find('.article-title').attr('href');
                var img = $element.find('img').first().attr('src');
                if (href) {
                    superagent.get(href).end(function (err, sres) {
                        if (err) throw err;
                        var $ = cheerio.load(sres.text, {decodeEntities: false});
                        var title = $('#articleTitle').text();
                        var content = $('.document').html();
                        var copyright = $('.copyright').html();

                        console.log(img + ':' + title + copyright);
                    });
                }
            });
            res.send('ok');
        });
});

module.exports = router;