module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define('rating', {
        value: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, 
        {
            freezeTableName: true,
            timestamps: false
        },
    );
    
    return Rating;
}