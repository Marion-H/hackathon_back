const express = require("express");

const patient = express.Router();
const sequelize = require("sequelize");

const Patient = require("../sequelize/models/patient.model");

patient.get("/", async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

patient.post("/", async (req, res) => {
  const { lastname, firstname, birthday } = req.body;
  try {
    const score = 0;
    const patients = await Patient.create({
      lastname,
      firstname,
      birthday,
      score,
    });
    res.status(201).json(patients);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

patient.get("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const patients = await Patient.findOne({ where: { uuid } });
    res.status(200).json(patients);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

patient.put("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const { lastname, firstname, birthday } = req.body;
  try {
    await Patient.update(
      {
        lastname,
        firstname,
        birthday,
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

patient.put("/:uuid/click", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    await Patient.update({
      score: sequelize.literal("score+1"),
    },{where: {uuid}});
    res.status(201).end();
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = patient;
