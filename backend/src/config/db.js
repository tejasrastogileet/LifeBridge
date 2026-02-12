const mongoose =require("mongoose");

function dbConnect(){
    try{
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/LifeBridge');
    }
    catch(e){
        console.log("Error Connecting Database");
    }
}

module.exports = dbConnect;