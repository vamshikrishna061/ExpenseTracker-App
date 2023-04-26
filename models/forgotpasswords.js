const Sequelize = require('sequelize');
const sequelize = require('../utli/database');


const Forgotpassword = sequelize.define('forgotpassword',{
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true

    },
    active: Sequelize.BOOLEAN,
})

module.exports = Forgotpassword;


