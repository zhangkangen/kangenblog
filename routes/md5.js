/**
 * Created by 小康 on 2015/7/17.
 */
var express = require('express');
var utility = require('utility');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log(req.query);
    var q = req.query.q;
    console.log(q);
    if (q) {
        var md5Value = utility.md5(q);
        var sha1Value = utility.sha1(q);
        res.send(q + ':' + md5Value + '<br/>' + q + ':' + sha1Value);
    } else {
        res.send('缺少参数q');
    }
});

module.exports = router;