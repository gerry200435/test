/**
 * Created by gerry on 16/8/5.
 */
// dao/userSqlMapping.js
// CRUD SQL语句
var msg = {
	insert: 'insert into comment_test(user_id, content, date) values (2, ?, ?)',
	update: 'update comment_test set content = ? where id = ?',
	delete: 'delete from comment_test where id = ?',
	queryById: 'select * from comment_test where id = ?',
	queryByUser: 'select * from comment_test where user_id = ?',
	queryAll: 'select * from comment_test'
};

module.exports = msg;