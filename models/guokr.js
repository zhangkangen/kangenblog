/**
 * Created by 小康 on 2015/7/22.
 */
var  db = require('./db');
var Guokr = db.define('guokr', {
    id: {type: 'serial', key: true},
    author: {type: 'text'},
    title: {type: 'text'},
    content: {type: 'text'},
    img: {type: 'text'},
    copyright: {type: 'text'}
});

module.exports = Guokr;