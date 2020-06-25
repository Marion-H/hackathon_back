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
      allowNull: true,
    },
    birthday: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    weight: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    pathology: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {}
);

module.exports = Patient;
