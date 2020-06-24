const express = require("express");

const patient = express.Router();

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
    res.status(201).json(patients)
  } catch (err) {
    res.status(422).json({
        status: "error",
        message: "invalid request",
      });
  }
});


module.exports = patient;
