/**
 * Created by 小康 on 2015/7/19.
 */
var db = require('./db');

var Article = db.define('article', {
    id: {type: 'serial', key: true},
    title:{type:'text'},
    href: {type: 'text'},
    img: {type: 'text'},
    author: {type: 'text'},
    content: {type: 'text'}
});

Article.prototype.getHref = function (callback) {
    db.models.article.one({href: this.href}, function (err, result) {
        if (err) callback(err);
        callback(err, result);
    });
}

Article.prototype.save = function (callback) {
    db.models.article.create(this, function (err, result) {
        callback(err, result);
    });
}

module.exports = Article;
