const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js')

router.get('/doctors', appointmentController.listOfDoctors, (req, res)=> {
  return res.status(200).json(res.locals.doctors)
});

router.get('/appointments', appointmentController.allAppointmentsOfDoctor, (req, res)=> {
  return res.status(200).json(res.locals.doctorAppointments);
});

router.delete('/appointments', appointmentController.deleteAppointment, (req, res)=> {
  return res.sendStatus(200);
});

router.post('/appointments', appointmentController.addAppointment, (req, res)=> {
  return res.sendStatus(200);
});

router.patch('/appointments', appointmentController.updateAppointmentTime, (req, res)=> {
  return res.sendStatus(201);
})

module.exports = router;