module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define('cart', {
        quantity: {
            type: Sequelize.INTEGER,
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
        },
        productId: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            reference: {
                model: 'product',
                key: 'id',
                as: 'productId',
            }
        }
    }, 
        {
            freezeTableName: true,
            timestamps: false
        },
    );
    
    return Cart;
}