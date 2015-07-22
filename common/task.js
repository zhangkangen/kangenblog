/**
 * Created by 小康 on 2015/7/19.
 */
var superagent = require('superagent');
var cheerio = require('cheerio');
var Article = require('../models/article');

module.exports = function () {
    console.log('ok');
    superagent.get('http://wufazhuce.com/one')
        .end(function (err, sres) {
            //常规的错误处理
            if (err) return err;
            //sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后就可以
            //得到一个实现了 jquery 接口的变量，我们习惯性的将它命名为 $ 剩下的都是jquery的内容
            var $ = cheerio.load(sres.text, {decodeEntities: false});
            $('.corriente').each(function (index, element) {
                var $element = $(element).first();
                if ($element) {
                    var href = $element.find('a').attr('href');
                    if (href) {
                        var img = $element.find('img').first().attr('src');
                        console.log(img);
                        superagent.get(href).end(function (err, sres) {
                            if (err) {
                                return err;
                            }

                            var $c = cheerio.load(sres.text, {decodeEntities: false});
                            var title = $c('.articulo-titulo').text();
                            var author = $c('.articulo-autor').html();
                            var content = $c('.articulo-contenido').html();

                            var article = new Article({
                                author: author,
                                title: title,
                                content: content
                            });
                            article.getByTitle(function (err, result) {
                                if (err) throw err;
                                if (result) {
                                    console.log('文章已存在：' + result.id + ':' + result.title);
                                } else {
                                    article.save(function (err, result) {
                                        console.log('文章保存成功：' + result.id + ':' + result.title);
                                    });
                                }
                            });
                        });
                    }
                }

            });
        });
}