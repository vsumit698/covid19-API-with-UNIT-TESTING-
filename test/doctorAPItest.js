process.env.NODE_ENV = 'test';
// console.log(require('config').util.getEnv('NODE_ENV'),3);

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

//testing doctor Registration-----------------------------------

module.exports.doctorRegistration1 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .post('/doctors/register')
    .send(require('config').doctor)
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Doctor Successfully Registered :) ');
        res.body.should.have.property('doctor');
        res.body.doctor.should.be.a('object');
        done();
    });
}
module.exports.doctorRegistration2 = function(done){
    // console.log('doctor',doctor);
    chai.request(server)
    .post('/doctors/register')
    .send(require('config').doctor)
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('USERNAME is not Available :(');
        done();
    });
}

module.exports.doctorRegistration3 = function(done){
    // console.log('doctor',doctor);
    let doctor = {name : 'sumit'};
    chai.request(server)
    .post('/doctors/register')
    .send(doctor)
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('NAME or PASSWORD (not provided)');
        done();
    });

};
//testing doctor LOG IN-----------------------------------

module.exports.doctorLogin1 = function(done){
    let doctor = {name : 'sumit',password : '123'};
    chai.request(server)
    .post('/doctors/login')
    .send(doctor)
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Invalid UserName or Password :(");
        done();
    });
};

module.exports.doctorLogin2 = function(done){
    let doctor = {name : 'sumit' };
    chai.request(server)
    .post('/doctors/login')
    .send(doctor)
    .end(function(err,res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('NAME or PASSWORD (not provided)');
        done();
    });
};

module.exports.doctorLogin3 = function(done){
    chai.request(server)
    .post('/doctors/login')
    .send(require('config').doctor)
    .end(function(err,res){
        // saving token value
        require('config').token = res.body.token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("successfully authenticated by JWT");
        res.body.should.have.property('token');
        done();
    });
};

process.env.NODE_ENV = 'development';