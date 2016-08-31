/**
 * Created by lenovo on 2016/8/31.
 */
function commentModel(sequelize, DataTypes) {
    var Comment = sequelize.define('comment_test', {
        user_id: {
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return Comment;
}
module.exports = commentModel;
