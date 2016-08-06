/**
 * Created by gerry on 16/8/5.
 */
// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./msgbdSql');

// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if (typeof ret === undefined) {
		res.json({
			code: '1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function (err, connection) {
			if (err) {
				console.log("POOL ==> " + err);
				return;
			}
			// 获取前台页面传过来的参数
			var param = req.query || req.params;

			// 建立连接，向表中插入值
			// 'insert into comment_test(user_id, content, date) values (2, ?, ?)',
			connection.query($sql.insert, [param.content, param.date], function (err, result) {
				if (result) {
					result = {
						code: 200,
						msg: '增加成功'
					};
				}

				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);

				// 释放连接
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function (err, connection) {
			if (err) {
				console.log("POOL ==> " + err);
				return;
			}
			var id = +req.query.id;
			//'delete from comment_test where id = ?',
			connection.query($sql.delete, id, function (err, result) {
				if (result.affectedRows > 0) {
					result = {
						code: 200,
						msg: '删除成功'
					};
				} else {
					result = undefined;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		var param = req.query || req.params;
		if (param.content == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}

		pool.getConnection(function (err, connection) {
			if (err) {
				console.log("POOL ==> " + err);
				return;
			}
			//update:'update comment_test set content = ? where id = ?',
			connection.query($sql.update, [param.content, +param.id], function (err, result) {
				// 使用页面进行跳转提示
				if (result.affectedRows > 0) {
					result = {
						code: 200,
						msg: "succ"
					}; // 第二个参数可以直接在jade中使用
				} else {
					result = undefined;
				}
				jsonWrite(res, result);

				connection.release();
			});
		});

	},
	queryById: function (req, res, next) {
		var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function (err, connection) {
			if (err) {
				console.log("POOL ==> " + err);
				return;
			}
			connection.query($sql.queryById, id, function (err, result) {
				jsonWrite(res, result);
				connection.release();

			});
		});
	},
	queryByUid: function (req, res, next) {
		pool.getConnection(function (err, connection) {
			if (err) {
				console.log("POOL ==> " + err);
				return;
			}
			var uid = +req.query.id;
			connection.query($sql.queryAll, uid, function (err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	}
};