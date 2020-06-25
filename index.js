require('dotenv').config();
const express = require('express');

const sequelize = require("./sequelize/sequelize");
require('./sequelize/association')

const app = express();
const cors = require("cors");

const PORT = 8000;

const patients = require('./routes/patient.route')
const doctors = require('./routes/doctor.route')
const dailyDatas = require('./routes/dailyData.route')

app.use(express.json())

app.use(cors());

app.use('/patients', patients)
app.use('/doctors', doctors)
app.use('/dailyDatas', dailyDatas)

app.get('/', (req, res) => {
    res.status(200).send("Here is our API!")
})

async function main(){
    try{
        await sequelize.sync();
        await sequelize.authenticate();
        console.log("Database succesfully joined")
        app.listen(PORT, (err) => {
            if (err) throw new Error(err.message);
            console.log(`Server is running on htpp://localhost:${PORT}`);
        })
        
        
    }catch(err){
        console.log('Unable to join database',err.message);
    }
}

    main();






module.exports = app;