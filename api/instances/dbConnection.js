const { Sequelize } = require('sequelize');
const config = require('../config')

exports.sequelize = new Sequelize(config.DATABASE.DB_NAME, config.DATABASE.DB_USER, config.DATABASE.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
exports.checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}