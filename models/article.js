/**
 * Created by 小康 on 2015/7/19.
 */
var sequelize = require('./db');
var Sequelize = require('sequelize');
var User = require('./user');

//Article 实体类
var Article = sequelize.define('article', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, comment: '主键，自增'},
    title: {type: Sequelize.STRING, comment: '标题'},
    href: {type: Sequelize.STRING, comment: '原始链接'},
    img: {type: Sequelize.STRING, comment: '封面'},
    author: {type: Sequelize.STRING, comment: '作者'},
    content: {type: Sequelize.TEXT, comment: '内容'}
}, {
    methods: {}
});



module.exports = Article;
