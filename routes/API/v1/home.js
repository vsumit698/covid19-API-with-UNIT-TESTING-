const router = require('express').Router();
const passport = require('passport');
const homeApi = require('../../../controllers/homeApi');
/*
        - /doctors/register → with username and password
        - /doctors/login → returns the JWT to be used

        - /register_patient  (Authentication)
        - /patients/:id/create_report (Authentication)

        - /patients/:id/all_reports → List all the reports of a patient oldest to latest-
        -/reports/:status → List all the reports of all the patients filtered by a specific
                            status
*/
router.use('/doctors',require('./doctors'));
router.use('/patients',require('./patients'));

// for registering patient    ........(3)
router.post('/register_patient',passport.authenticate('jwt',{session:false}),homeApi.registerPatient);
// generates reports by status..........(6)
router.get('/reports/:status',homeApi.getReportByStatus);

module.exports = router;