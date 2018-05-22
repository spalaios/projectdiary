const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    username : {
       type : String,
       required : true,
       unique : true 
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password : {
        type : String,
        required : true
    },
    contact : {
        type : String
    }
});

//create the model

const userModel = mongoose.model('Usermod', userSchema );

module.exports = userModel;