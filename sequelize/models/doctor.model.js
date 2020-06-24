const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const Doctor = sequelizeInstance.define(
  "Doctor",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    firstname: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    adress: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
  },
  {}
);

module.exports = Doctor;
