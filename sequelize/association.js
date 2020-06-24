const Doctor = require("./models/doctor.model");
const Patient = require("./models/patient.model");
const DailyData = require("./models/dailyData.model");

Doctor.hasMany(Patient, { foreignKey: { allowNull: true }, as: "patients" });
Patient.belongsTo(Doctor);

Patient.hasMany(DailyData, {
  foreignKey: { allowNull: false },
  as: "dailyDatas",
});
DailyData.belongsTo(Patient);
