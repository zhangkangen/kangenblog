/**
 * Created by 小康 on 2015/7/19.
 */
var superagent = require('superagent');
var cheerio = require('cheerio');
var db = require('../models/db');

module.exports = function () {
    superagent.get('http://www.guokr.com/scientific/channel/fact/')
        .end(function (err, sres) {
            if (err) {
                console.log(err);
                return;
            }
            var $ = cheerio.load(sres.text, {decodeEntities: false});
            $('.article').each(function (index, element) {
                var $element = $(element);
                var href = $element.find('.article-title').attr('href');
                var img = $element.find('img').first().attr('src');
                if (href) {
                    superagent.get(href).end(function (err, sres) {
                        if (err) {
                            return err;
                        }
                        var $ = cheerio.load(sres.text, {decodeEntities: false});
                        var title = $('#articleTitle').text();
                        var author = $('.content-th-info a').html();
                        var content = $('.document').html();
                        var copyright = $('.copyright').html();

                        db.models.guokr.find({title: title}, function (err, results) {
                            if (err) return err;
                            if (results.length > 0) {
                                console.log('已存在');
                            } else {
                                db.models.guokr.create({
                                    title: title,
                                    author: author,
                                    content: content,
                                    img: img,
                                    copyright: copyright
                                }, function (err, result) {
                                    if (err) return err;
                                    console.log(result.id);
                                });
                            }
                        });
                    });
                }
            });
        });
}