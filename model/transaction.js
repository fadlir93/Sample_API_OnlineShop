module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
        total: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        approvalStatus: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        memberId: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            reference: {
                model: 'member',
                key: 'id',
                as: 'memberId',
            }
        }
    }, 
        {
            freezeTableName: true,
            timestamps: false
        },
    );
    
    return Transaction;
}