const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
  name:{
    type:String,  //data type
    required:true, //validate
  },

  gmail:{
    type:String, //data type
    required:true, //validate
  },

  age:{
    type:Number, //data type
    required:true, //validate
  },
  address:{
    type:String, //data type
    required:true, //validate
  }

});

module.exports = mongoose.model(
    "UserAnalysis", //file name
    userSchema //function schema
)