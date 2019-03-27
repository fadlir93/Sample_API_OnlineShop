module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define('cart', {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, 
        {
            freezeTableName: true,
            timestamps: false
        },
    );
    
    return Cart;
}