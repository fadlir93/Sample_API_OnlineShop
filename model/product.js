module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        productName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        productType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, 
        {
            freezeTableName: true,
            timestamps: false
        },
    );

    
    return Product;
}