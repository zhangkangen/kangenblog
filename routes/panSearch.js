/**
 * Created by xiaokang on 2015/12/12.
 */
var superagent = require('superagent');
var cheerio = require('cheerio');

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('pan/panSearch', {title: '网盘搜索',data:[]});
});

router.post('/', function (req, res, next) {

    //var url = 'https://www.google.com.hk/?gws_rd=cr,ff,ssl#safe=strict&q=site:pan.baidu.com+';
    //https://www.baidu.com/s?wd=%E5%BF%83%E8%BF%B7%E5%AE%AB
    var url = 'http://cn.bing.com/search?q==site:pan.baidu.com+';
    var q = req.body.q;

    url += q;
    console.log(url);
    superagent.get(url)
        .end(function (err, sres) {
            if (err) {
                console.log('error:', err);
                return err;
            }

            var $ = cheerio.load(sres.text, {decodeEntities: false});
            var data = [];

            $('.b_algo').each(function (index, element) {
                var $element = $(element).first();
                var href = $element.find('a').first().attr('href');
                var content = $element.find('a').first().text();
                data.push({
                    href: href,
                    content: content
                })
            });
            console.log(data.length);
            res.render('pan/panSearch', {title: '网盘搜索', data: data});
        });
});

module.exports = router;
