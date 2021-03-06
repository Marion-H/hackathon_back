const express = require("express");

const patient = express.Router();
const sequelize = require("sequelize");

const Patient = require("../sequelize/models/patient.model");
const Doctor = require("../sequelize/models/doctor.model");
const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");
const DailyData = require("../sequelize/models/dailyData.model");

patient.get("/", async (req, res) => {
  try {
    const patients = await Patient.findAll({ include: [{ model: Doctor }] });
    res.status(200).json(patients);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

patient.post("/", async (req, res) => {
  const {
    lastname,
    firstname,
    birthday,
    DoctorUuid,
    gender,
    weight,
    pathology,
  } = req.body;
  try {
    const score = 0;
    const patients = await Patient.create({
      lastname,
      firstname,
      birthday,
      score,
      DoctorUuid,
      gender,
      weight,
      pathology,
    });
    res.status(201).json(patients);
  } catch (err) {
    res.status(422).json(err);
  }
});

patient.get("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const patients = await Patient.findOne(
      { include: [{ model: DailyData, as: "dailyDatas" }] },
      { where: { uuid } }
    );
    res.status(200).json(patients);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

patient.put("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  const uuid = req.params.uuid;
  const {
    lastname,
    firstname,
    birthday,
    gender,
    weight,
    pathology,
    DoctorUuid,
  } = req.body;
  try {
    await Patient.update(
      {
        lastname,
        firstname,
        birthday,
        gender,
        weight,
        pathology,
        DoctorUuid,
      },
      { where: { uuid } }
    );
    res.status(201).end();
  } catch (err) {
    res.status(422).json(err);
  }
});

patient.put(
  "/:uuid/click",
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const uuid = req.params.uuid;
    try {
      await Patient.update(
        {
          score: sequelize.literal("score+1"),
        },
        { where: { uuid } }
      );
      res.status(201).end();
    } catch (err) {
      res.status(422).json(err);
    }
  }
);

module.exports = patient;
