/**
 * Created by 小康 on 2015/7/22.
 */
var  db = require('./db'),
	Sequelize = require('sequelize');
var Guokr = db.define('guokr', {
    id: {type: Sequelize.INTEGER,primaryKey:true,autoIncrement:true,comment:'自增主键'},
    href:{type:Sequelize.STRING,comment:'文章原地址'},
    author: {type: Sequelize.STRING,comment:'作者'},
    title: {type: Sequelize.STRING,comment:'标题'},
    content: {type: Sequelize.TEXT,comment:'内容'},
    img: {type: Sequelize.STRING,comment:'封面'},
    copyright: {type: Sequelize.STRING,comment:'版权声明'}
});

module.exports = Guokr;