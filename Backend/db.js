const mongoose = require("mongoose");

//Got from mongoDB Atlas
//Got URL from connect with application in the mongoDB compass
const mongourl = "mongodb://GoFood:shiv@ac-h149bmy-shard-00-00.yexynqa.mongodb.net:27017,ac-h149bmy-shard-00-01.yexynqa.mongodb.net:27017,ac-h149bmy-shard-00-02.yexynqa.mongodb.net:27017/GoFood?ssl=true&replicaSet=atlas-3e19yj-shard-0&authSource=admin&retryWrites=true&w=majority";

//Fetching data from our mongoDB
const mongoDBconnect = async() => {
    await mongoose.connect(mongourl , { useNewUrlParser: true } , async (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Mongoose is connected successfully with backend!");

            //We are Successfully stored the data from the collection name mentioned 
            //in the string into fetched_data variable
            const fetched_data_for_food_iteams = await mongoose.connection.db.collection("Food-Iteams");
            
            //We are finding all data then put that in an array and printing it.
            fetched_data_for_food_iteams.find({}).toArray(function (err , data) {
                if(err) console.log(err);
                else {
                    global.food_iteams = data;
                    // console.log(data);
                }
            })


            const fetched_data_for_food_category = await mongoose.connection.db.collection("Food-types");
            
            //We are finding all data then put that in an array and printing it.
            fetched_data_for_food_category.find({}).toArray(function (err , data) {
                if(err) console.log(err);
                else {
                    global.food_category = data;
                    // console.log(data);
                }
            })
        }
    })
}

//Exporting the mongoDBconnect function to index.js
module.exports = mongoDBconnect;