const express = require("express");

const doctor = express.Router();

const Doctor = require("../sequelize/models/doctor.model");
const Patient = require("../sequelize/models/patient.model")

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

doctor.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.findAll({include : [{model : Patient, as: "patients"}]});
    res.status(200).json(doctors);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

doctor.post("/", async (req, res) => {
  const { lastname, firstname, city, adress } = req.body;
  try {
    const score = 0;
    const doctors = await Doctor.create({
      lastname,
      firstname,
      city,
      adress,
    });
    res.status(201).json(doctors);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

doctor.get("/:uuid", regExpIntegrityCheck(uuidv4RegExp),async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const doctors = await Doctor.findOne({ where: { uuid } });
    res.status(200).json(doctors);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

doctor.put("/:uuid",regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  const uuid = req.params.uuid;
  const { lastname, firstname, city, adress } = req.body;
  try {
    await Doctor.update(
      {
        lastname,
        firstname,
        city,
        adress,
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
});

module.exports = doctor;
