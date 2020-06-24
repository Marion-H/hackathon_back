require("dotenv").config();
const Sequelize = require("sequelize");

const { DB_DATABASE, DB_HOST, DB_USER, DB_PASSWORD, DB_DIALECT } = process.env;

module.exports = new Sequelize({
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  dialect: DB_DIALECT,
});
