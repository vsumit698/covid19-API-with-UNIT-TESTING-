const router = require('express').Router();
const patientApi = require('../../../controllers/patientsApi');
const passport = require('passport');
/// path is /patients/
/*
        - /patients/:id/create_report (Authentication).....(4)

        - /patients/:id/all_reports → List all the reports of a patient oldest to latest....(5)
*/
router.post('/:id/create_report',passport.authenticate('jwt',{session:false}),patientApi.createReport);

router.get('/:id/all_reports',patientApi.getReportByPatient);

module.exports = router;