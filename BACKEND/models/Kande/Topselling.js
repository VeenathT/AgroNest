const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const topsellingSchema=new Schema({
  dealername:{
    type:String,  //data type
    required:true, //validate
  },

  noofsales:{
    type:Number, //data type
    required:true, //validate
  }


});

module.exports = mongoose.model(
    "TopSelling", //file name
    topsellingSchema //function schema
)