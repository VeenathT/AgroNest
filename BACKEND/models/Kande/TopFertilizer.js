const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const fertilizerSchema=new Schema({
  fertilizername:{
    type:String,  //data type
    required:true, //validate
  },

  noofsales:{
    type:Number, //data type
    required:true, //validate
  }


});

module.exports = mongoose.model(
    "FertilizerAnalysis", //file name
    fertilizerSchema //function schema
)