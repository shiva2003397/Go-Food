const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema ({
    name : {
        type : String ,
        required : true
    },
    location : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true
    },
    password : {
        type : String ,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

//Writing mongoose.model states that we have created a new collection name with user
module.exports = mongoose.model('user' , UserSchema);