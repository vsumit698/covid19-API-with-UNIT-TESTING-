const router = require('express').Router();
const doctorApi = require('../../../controllers/doctorsApi');
/// path is /doctors/
/*
        - /doctors/register → with name and password
        - /doctors/login → returns the JWT to be used

*/
router.post('/register',doctorApi.registerDoctor);// 1
router.post('/login',doctorApi.loginDoctor);// 2

module.exports = router;