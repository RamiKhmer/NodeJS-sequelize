const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('node_sequelize', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;