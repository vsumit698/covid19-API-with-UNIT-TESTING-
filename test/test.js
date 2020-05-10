// console.log(require('config').util.getEnv('NODE_ENV'),2);
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');

let should = chai.should();

chai.use(chaiHttp);
// mock user to check tests
// const doctor = {
//     name : 'sumit',
//     password : '12345'
// }
// var token  = "";
const doctorModel = require('../models/doctorModel');
const patientModel = require('../models/patientModel');
const reportModel = require('../models/reportModel');

const doctorAPItest = require('./doctorAPItest');
const patientAPItest = require('./pateintAPItest');
const reportAPItest = require('./reportAPItest');

describe('testing for doctor (Registration,  LOG IN)', function(){
    // deleting data from database before performing all test
    before(function(done){
        doctorModel.remove({},function(err){
            if(err) console.log(err);
        });
        patientModel.remove({},function(err){
            if(err) console.log(err);
        });
        reportModel.remove({},function(err){
            done();
        });
        
    });

    //  test for doctor routes

    describe('testing doctor Registration',function(){
        
        it('create doctor when username available with password',doctorAPItest.doctorRegistration1);

        it('Do not create doctor when username already exists',doctorAPItest.doctorRegistration2);

        it('Do not create doctor if username or password not provided',doctorAPItest.doctorRegistration3);
    });

    describe('testing doctor LOG IN',function(){

        it('Login failed if name or password is wrong',doctorAPItest.doctorLogin1);
        it('login failed if username or password not provided',doctorAPItest.doctorLogin2);
        it('Login Successfull if name and password provided correct',doctorAPItest.doctorLogin3);

    });
    //  test for patient routes

    describe('testing patient Registration',function(){

        it('Do not register patient if token expired or not provided',patientAPItest.patientRegistration1);

        it('Do not register patient if (PHONE FIELD) not provided but (valid token)',patientAPItest.patientRegistration2);

        it('Register patient if valid token is provided',patientAPItest.patientRegistration3);

        it('Do not register patient if already registered',patientAPItest.patientRegistration4);

    });

    describe('testing patient Report Creation',function(){

        it('Do not create report if token expired or not provided',patientAPItest.patientReportCreation1);
        it('Do not create report if patient not found',patientAPItest.patientReportCreation2);
        it('Do not create report if patient found but invalid status',patientAPItest.patientReportCreation3);
        it('Create report if patient found & valid status',patientAPItest.patientReportCreation4);

    });
    // test for report generation routes
    describe('testing Report Generation Patient Wise',function(){

        it('Report not Generated if patient _id is invalid',reportAPItest.reportGenerationPatientWise1);

        it('Report not Generated if patient not found',reportAPItest.reportGenerationPatientWise2);

        it('Report Generated if patient _id is found',reportAPItest.reportGenerationPatientWise3);

    });

    describe('testing Report Generation Status Wise',function(){

        it('Report not Generated if status (invalid)',reportAPItest.reportGenerationStatusWise1);
        it('Report not Generated if status(valid) & reports(not found)',reportAPItest.reportGenerationStatusWise2);
        it('Report Generated if status(valid) & reports(found)',reportAPItest.reportGenerationStatusWise3);
    });

});

process.env.NODE_ENV = 'development';