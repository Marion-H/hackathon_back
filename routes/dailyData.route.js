const express = require("express");

const dailyData = express.Router();


const DailyData = require("../sequelize/models/dailyData.model");
const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const Patient = require("../sequelize/models/patient.model")

dailyData.get("/", async (req, res) => {
    try {
      const dailyDatas = await DailyData.findAll({include: [{model : Patient }]});
      res.status(200).json(dailyDatas);
    } catch (err) {
      res.status(422).json({
        status: "error",
        message: "invalid request",
      });
    }
  });

  module.exports = dailyData;