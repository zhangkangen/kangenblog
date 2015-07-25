/**
 * Created by 小康 on 2015/7/17.
 */
var db = require('./db');

var User = db.define('user', {
    id: {type: 'serial', key: true},
    username: {type: 'text'},
    password: {type: 'text'}
});
module.exports = User;