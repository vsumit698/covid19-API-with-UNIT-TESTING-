const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    doctor : {
        type : String,
        required : true,
    },
    patient:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'patientModel'
    },
    status : {                          
        type : String,                          
        required : true
    }
},{timestamps : true});
/*Status (You can use enums if you want to):
-   Can be either of: [Negative, Travelled-Quarantine,
    Symptoms-Quarantine, Positive-Admit]*/
const reportModel = mongoose.model('reportModel',reportSchema);
module.exports = reportModel;