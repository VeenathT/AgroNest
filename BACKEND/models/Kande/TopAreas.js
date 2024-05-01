const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const topareasSchema=new Schema({
 
  area:{
    type:String,  //data type
     required:true, //validate
  },

  noofRegistrations:{
    type:Number, //data type
     required:true, //validate
  }


});

module.exports = mongoose.model(
    "TopAreas", //file name
    topareasSchema //function schema
)