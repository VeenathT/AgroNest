const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const topareasSchema=new Schema({
  fertilizername:{
    type:String,  //data type
    required:true, //validate
  },
  area:{
    type:String,  //data type
     required:true, //validate
  },

  noofsales:{
    type:Number, //data type
     required:true, //validate
  }


});

module.exports = mongoose.model(
    "TopAreas", //file name
    topareasSchema //function schema
)