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
      allowNull: false,
    },
    weight: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    mood: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    appetite: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {}
);

module.exports = DailyData;
