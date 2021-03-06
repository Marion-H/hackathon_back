const express = require("express");

const dailyData = express.Router();

const DailyData = require("../sequelize/models/dailyData.model");
const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const Patient = require("../sequelize/models/patient.model");

dailyData.get("/", async (req, res) => {
  try {
    const dailyDatas = await DailyData.findAll({
      include: [{ model: Patient }],
    });
    res.status(200).json(dailyDatas);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

dailyData.post("/", async (req, res) => {
  const { bloodSugar, weight, mood, appetite, PatientUuid } = req.body;
  try {
    const dailyDatas = await DailyData.create({
      bloodSugar,
      weight,
      mood,
      appetite,
      PatientUuid,
    });
    res.status(201).json(dailyDatas);
  } catch (err) {
    res.status(422).json(err);
  }
});

dailyData.get(
  "/:uuid",
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const dailyDatas = await DailyData.findOne(
        { include: [{ model: Patient }] },
        { where: { uuid } }
      );
      res.status(200).json(dailyDatas);
    } catch (err) {
      res.status(422).json({
        status: "error",
        message: "invalid request",
      });
    }
  }
);

dailyData.put(
  "/:uuid",
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const uuid = req.params.uuid;
    const { bloodSugar, weight, mood, appetite } = req.body;
    try {
      await DailyData.update(
        {
          bloodSugar,
          weight,
          mood,
          appetite,
        },
        { where: { uuid } }
      );
      res.status(201).end();
    } catch (err) {
      res.status(422).json({
        status: "error",
        message: "invalid request",
      });
    }
  }
);

module.exports = dailyData;
