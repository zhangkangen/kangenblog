var db = require('./db');

var S_role_user = db.define('s_role',{
	id:{type:'serial',key:true},
	role_id:{type:'text'},
	user_id:{type:'text'}
});

module.exports = S_role_user;