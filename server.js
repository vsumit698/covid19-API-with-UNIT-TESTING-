const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-JWT');
const bodyParser = require('body-parser');


//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  


app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/API/v1/home'));
// console.log(require('config').util.getEnv('NODE_ENV'),1);

 
app.listen(port,function(error){
    if(error) {
        console.log(`Error in running server ${error}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
}); 

module.exports = app;