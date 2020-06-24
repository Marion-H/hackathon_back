const express = require("express");

const doctor = express.Router();

const Doctor = require("../sequelize/models/doctor.model");

doctor.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
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

doctor.get("/:uuid", async (req, res) => {
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

// doctor.put("/:uuid", async (req, res) => {
//   const uuid = req.params.uuid;
//   const { lastname, firstname, birthday } = req.body;
//   try {
//     await Doctor.update(
//       {
//         lastname,
//         firstname,
//         birthday,
//       },
//       { where: { uuid } }
//     );
//     res.status(201).end();
//   } catch (err) {
//     res.status(422).json({
//       status: "error",
//       message: "invalid request",
//     });
//   }
// });

module.exports = doctor;
