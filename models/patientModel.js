const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    phone : {
        type : String,
        required : true,
        unique : true
    },
    reports :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'reportModel'
        }
    ]
});

const patientModel = mongoose.model('patientModel',patientSchema);
module.exports = patientModel;