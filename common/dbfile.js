/**
 * Created by gerry on 16/8/23.
 */
function userModel(sequelize, DataTypes) {
	var User = sequelize.define('user', {
		firstName: {
			type: DataTypes.STRING
		},
		lastName: {
			type: DataTypes.STRING
		}
	});
	return User;
}
module.exports = userModel;
