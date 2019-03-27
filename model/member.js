module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define('member', {
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fullname: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        birthdate: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, 
        {
            freezeTableName: true,
            timestamps: false
        },
    );
    
    return Member;
}