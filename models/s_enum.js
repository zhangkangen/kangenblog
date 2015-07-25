/**
 * Created by 小康 on 2015/7/19.
 */
 var sequelize = require('./db'),
 	Sequelize = require('sequelize');

 var S_enum = db.define('s_enum',{
 	id: {type:Sequelize.INTEGER, primaryKey: true,comment:'主键'},
 	enum_groupid: {type:Sequelize.INTEGER,comment:'组名称编号' },			/*组名称编号 	*/
 	enum_groupname: {type: Sequelize.TEXT,comment:'组名称'}   			/*组名称 		*/
 	enum_num:{type:Sequelize.INTEGER,comment:'枚举编号'}					/*枚举标号		*/
 	enum_memo:{type:Sequelize.TEXT,comment:'枚举描述'}						/*枚举描述      */
 });

 module.exports = S_enum;