const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    technologies : {
        type : String,
    },
    concepts : {
        type : String
    }
});

//create the model

const formModel = mongoose.model('projectdata', formSchema );

module.exports = formModel;