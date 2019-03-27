module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comment', {
        message: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, 
        {
            freezeTableName: true,
            timestamps: false
        },
    );
    
    return Comment;
}