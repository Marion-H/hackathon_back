const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const DailyData = sequelizeInstance.define(
  "DailyData",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    bloodSugar: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    weight: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    mood: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    appetite: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {}
);

module.exports = DailyData;
