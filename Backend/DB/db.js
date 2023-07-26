const {
  Sequelize
} = require('sequelize');
const env = require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

module.exports = sequelize;