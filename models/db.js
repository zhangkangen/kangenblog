/**
 * Created by 小康 on 2015/7/19.
 */

 var Sequelize = require('sequelize');
var opts = {
    database: "kangblog",
    protocol: "mysql",
    host: "localhost",
    user: "root",
    password: "1234",
    port: '3306',
    query: {
        pool: true,
        debug: true
    },
}

var optsBae = {
    database: "DCpUYwASKuXycPyYmwzz",
    protocol: "mysql",
    host: "sqld.duapp.com",
    port: "4050",
    user: "acf6ccfc22694dc9acac47b6684a8119",
    password: "66202cff487445aa90690b9e379c39a3",
    query: {
        //pool: true,
        debug: true
    },
}

// var db = orm.connect(opts, function (err, db) {
//     if (err)  throw err;

// });

var db = new Sequelize('kangblog','root','1234');
var User = db.define('User',{
    username: Sequelize.STRING,
    birthday:Sequelize.DATE
});
db.sync().then(function(){
    return User.create({
        username:'janedoe',
        birthday:new Date(1980,6,20)
    });
}).then(function(jane){
    console.log(jane.get({
        plain:true
    }))
});
module.exports = db;