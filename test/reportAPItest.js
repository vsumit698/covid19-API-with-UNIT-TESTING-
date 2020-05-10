process.env.NODE_ENV = 'test';
// console.log(require('config').util.getEnv('NODE_ENV'),3);

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

//testing Report Generation Patient Wise-----------------------------------

module.exports.reportGenerationPatientWise1 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .get(`/patients/${require('config').patient._id+123}/all_reports`)// _id is invalid
    .end(function(err,res){
        res.should.have.status(500);
        res.body.should.have.property('message').eql("error occurred at Server :(");
        res.body.should.have.property('error');
        res.body.error.should.have.property('value').eql(require('config').patient._id+123);
        res.body.error.should.have.property('path').eql('_id');
        done();
    });
};
module.exports.reportGenerationPatientWise2 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .get(`/patients/5eb82e046bfc0922f51eeebb/all_reports`)// _id is valid but patient not found
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.have.property('message').eql("Patient Not Found :(");
        done();
    });
};
module.exports.reportGenerationPatientWise3 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .get(`/patients/${require('config').patient._id}/all_reports`)// _id is valid and patient found
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.have.property('message').eql("Patient Reports Found ");
        res.body.should.have.property('patient');
        res.body.patient.should.have.property('reports');
        res.body.patient.reports.should.be.a('array');
        done();
    });
};

//testing Report Generation Status Wise-----------------------------------

module.exports.reportGenerationStatusWise1 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .get(`/reports/${'positive-admit1234'}`)// _status (invalid)
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.have.property('message').eql("report status is invalid");
        done();
    });
};
module.exports.reportGenerationStatusWise2 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .get(`/reports/${'negative'}`)// _status (valid) & report(not found)
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.have.property('message').eql("No Reports fot this valid Status :( ");
        done();
    });
};
module.exports.reportGenerationStatusWise3= function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .get(`/reports/${'positive-admit'}`)// _status (valid) & report(found)
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.have.property('message').eql("Reports Found Successfully :)");
        res.body.should.have.property('reports');
        res.body.reports.should.be.a('array');
        done();
    });
};

process.env.NODE_ENV = 'development';