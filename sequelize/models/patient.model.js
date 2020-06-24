const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const Patient = sequelizeInstance.define(
  "Patient",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    lastname: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    birthday: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
  },
  {}
);

module.exports = Patient;
