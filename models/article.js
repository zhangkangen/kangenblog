/**
 * Created by 小康 on 2015/7/19.
 */
 var db = require('./db');
 var User = require('./user');

//Article 实体类
var Article = db.define('article', {
    id: {type: 'serial', key: true},
    title: {type: 'text'},
    href: {type: 'text'},
    img: {type: 'text'},
    author: {type: 'text'},
    content: {type: 'text'}
}, {
    methods: {
        save: function (callback) {
            Article.save(this, function (err, result) {
                callback(err, result);
            });
        }
    }
});


module.exports = Article;
