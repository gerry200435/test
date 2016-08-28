/**
 * Created by gerry on 16/8/23.
 */
var Sql = require('../conf/db');
var sequelize = require('sequelize');
var User = Sql.define('user', {
	firstName: {
		type: sequelize.STRING
	},
	lastName: {
		type: sequelize.STRING
	}
});

module.exports = User;
