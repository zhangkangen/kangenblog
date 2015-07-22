/**
 * Created by 小康 on 2015/7/17.
 */
var db = require('./db');

var User = db.define('user', {
    id: {type: 'serial', key: true},
    username: {type: 'text'},
    password: {type: 'text'}
});

User.prototype.save = function (callback) {
    var user = {
        name: this.name,
        password: this.password
    };
};
User.get = function get(name, callback) {

};
module.exports = User;