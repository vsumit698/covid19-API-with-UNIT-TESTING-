process.env.NODE_ENV = 'test';
// console.log(require('config').util.getEnv('NODE_ENV'),3);

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

//testing patient Registration-----------------------------------

module.exports.patientRegistration1 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .post('/register_patient')
    .set('Authorization','Bearer 12'+require('config').token)// invalid token
    .send(require('config').patient)
    .end(function(err,res){
        res.should.have.status(401);
        done();
    });
};
module.exports.patientRegistration2 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .post('/register_patient')
    .set('Authorization','Bearer '+require('config').token)// valid token
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("phone field is not available");
        done();
    });
};
module.exports.patientRegistration3 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .post('/register_patient')
    .set('Authorization','Bearer '+require('config').token)// valid token
    .send(require('config').patient)
    .end(function(err,res){
        require('config').patient = res.body.patient;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Patient Successfully Registered :)");
        res.body.should.have.property('patient');
        res.body.patient.should.have.property('phone').eql(require('config').patient.phone);
        res.body.patient.reports.should.be.a('array');
        res.body.patient.reports.length.should.be.eql(0);
        done();
    });
};
module.exports.patientRegistration4 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .post('/register_patient')
    .set('Authorization','Bearer '+require('config').token)// valid token
    .send(require('config').patient)
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Patient Already Exists");
        res.body.should.have.property('patient');
        res.body.patient.should.have.property('phone').eql(require('config').patient.phone);
        res.body.patient.reports.should.be.a('array');
        done();
    });
};

//testing patient Report creation-----------------------------------

module.exports.patientReportCreation1 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .post(`/patients/${require('config').patient._id}/create_report`)
    .set('Authorization','Bearer 12'+require('config').token)// invalid token
    .send({status : 'positive-admit'})// valid status
    .end(function(err,res){
        res.should.have.status(401);
        done();
    });
};
module.exports.patientReportCreation2 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .post(`/patients/${require('config').patient._id+123}/create_report`)// patient id is invalid
    .set('Authorization','Bearer '+require('config').token)// valid token
    .send({status : 'positive-admit'})// valid status
    .end(function(err,res){
        res.should.have.status(500);
        res.body.should.have.property('message').eql("error occurred at Server :(");
        res.body.should.have.property('error');
        res.body.error.should.have.property('value').eql(require('config').patient._id+123);
        res.body.error.should.have.property('path').eql('_id');
        done();
    });
};
module.exports.patientReportCreation3 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .post(`/patients/${require('config').patient._id}/create_report`)// patient id is valid
    .set('Authorization','Bearer '+require('config').token)// valid token
    .send({status : 'positive-admitlki'})// invalid status
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.have.property('message').eql("report status is invalid");
        done();
    });
};
module.exports.patientReportCreation4 = function(done){
    // console.log('doctor',doctor);
    let report = {status : 'positive-admit'};
    chai.request(server)
    .post(`/patients/${require('config').patient._id}/create_report`)// patient id is valid
    .set('Authorization','Bearer '+require('config').token)// valid token
    .send(report)// valid status
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.have.property('message').eql("Patient Report Created :)");
        res.body.should.have.property('report');
        res.body.report.should.have.property('doctor').eql(require('config').doctor.name);
        res.body.report.should.have.property('patient');
        res.body.report.should.have.property('status').eql(report.status);
        done();
    });
};
process.env.NODE_ENV = 'development';