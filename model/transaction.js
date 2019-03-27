module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        approvalStatus: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, 
        {
            freezeTableName: true,
            timestamps: false
        },
    );
    
    return Transaction;
}