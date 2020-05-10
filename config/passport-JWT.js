const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;

const extractJWT = require('passport-jwt').ExtractJwt;
const doctorModel = require('../models/doctorModel');

var opts = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'covid19'
};

passport.use(new jwtStrategy(opts,function(JWTpayload,done){

    doctorModel.findById(JWTpayload._id,function(error,doctor){
        if(error){
            console.log("error found while finding doctor at JWT",error);
        }
        if(doctor){
            return done(null,doctor);
        }
        return done(null,false);
    });

}));

module.exports = passport;