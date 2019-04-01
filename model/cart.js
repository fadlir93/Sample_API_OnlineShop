module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define('cart', {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, 
        {
            freezeTableName: true,
            timestamps: false
        },
    );
    
    return Cart;
}