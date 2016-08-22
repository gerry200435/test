/**
 * Created by gerry on 16/8/5.
 */
var sequelize = require('sequelize');

// conf/db.js
// MySQL数据库联接配置
var dbconf = {
	mysql: {
		host: 'aliyun.invalo.com',
		user: 'nodetest',
		password: 'Nodetest123',
		database: 'node_test',
		port: 3306
	}
};

var sequelize = new sequelize(dbconf.mysql.database, dbconf.mysql.user, dbconf.mysql.password, {
	host: dbconf.mysql.host,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

module.exports = sequelize;