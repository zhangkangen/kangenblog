
var db = require('./db');

var S_role = db.define('s_role',{
	id:{type:'serial',key:true},
	role_name:{type:'text'}
});

module.exports = S_role;