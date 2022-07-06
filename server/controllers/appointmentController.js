const pg = require('../models/dbModel.js');


const appointment = {};
/*
An example web UI that would be built on top of this backend is shown below. Doctors should
have a unique ID, a first name, and a last name. Appointments should have a unique ID,
patient first name, patient last name, date & time, and kind (New Patient or Follow-up). The
backend must respond to HTTP requests (ie GET, POST, DELETE).

● Get a list of all doctors
● Get a list of all appointments for a particular doctor and particular day
● Delete an existing appointment from a doctor's calendar
● Add a new appointment to a doctor's calendar
○ New appointments can only start at 15 minute intervals (ie, 8:15AM is a valid time
but 8:20AM is not)
○ A doctor can have multiple appointments with the same time, but no more than 3
appointments can be added with the same time for a given doctor
*/

//get list of all doctors
appointment.listOfDoctors = (req, res, next) => {
  const queryString = 
  `SELECT *
  FROM doctors
  `

  pg.query(queryString)
    .then(data=> {
      res.locals.doctors = data.rows
      return next()
    })
    .catch((err)=> {
      next(err)
    })
};

//Get a list of all appointments for a particular doctor and particular day
//FE: send doctor id, date
appointment.allAppointmentsOfDoctor = (req, res, next) => {
  const { id, date } = req.body;
  const queryString = 
  `SELECT *
   FROM appointments
   WHERE doctorid = $1 AND date = $2
  `
  pg.query(queryString, [id, date])
    .then((data)=> {
      res.locals.doctorAppointments = data.rows
      return next();
    })
    .catch((err)=> {
      next(err)
    })
};

//● Delete an existing appointment from a doctor's calendar
//FE will send appointment ID
appointment.deleteAppointment = (req, res, next) => {
  const { id } = req.body;

  const queryString = 
  `DELETE FROM appointments
   WHERE id = $1
  `

  pg.query(queryString, [id])
    .then(()=> next())
    .catch((err)=> {
      next(err)
    })
};
// ● Add a new appointment to a doctor's calendar
// ○ New appointments can only start at 15 minute intervals (ie, 8:15AM is a valid time
// but 8:20AM is not)
// ○ A doctor can have multiple appointments with the same time, but no more than 3
// appointments can be added with the same time for a given doctor

appointment.addAppointment = async (req, res, next) => {
//Need doctor id
const { id, firstname, lastname, date, time, type } = req.body;
const mintues = parseInt(time.slice(-4, -2));
const valid = mintues % 15 === 0;

if(!valid){
  return next('Time must be 15minute intervals')
}

const doctorAvailibility = await checkConflictingAppointments(id, date, time);
console.log('doctor avail', doctorAvailibility)

//Need to query doctor appoints for same date and time, if greater than 3, return error
if(doctorAvailibility){
  const queryString = 
    `INSERT INTO appointments (firstname, lastname, date, time, type, doctorid)
     VALUES ($1, $2, $3, $4, $5, $6)
    `
  
  pg.query(queryString, [firstname, lastname, date, time, type, id])
    .then(()=> next())
    .catch((err)=> {
      return next(err)
    }) 
  }
  
  else{
    return next('Doctor is booked')
  }
  
};

function checkConflictingAppointments(doctorid, date, time) {
  const queryString = 
    `SELECT * FROM appointments
    WHERE doctorid = $1 AND date = $2 AND time = $3
    `

  return pg.query(queryString, [doctorid, date, time])
    .then((data) => {
      console.log('appointments', data.rows)
      if(data.rows.length >= 3) return false
      return true
    })
    .catch((err)=> {
      next(err)
    })
}


module.exports = appointment;