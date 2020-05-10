const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    patients :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'patientModel'
        }
    ]
});

const doctorModel = mongoose.model('doctorModel',doctorSchema);
module.exports = doctorModel;