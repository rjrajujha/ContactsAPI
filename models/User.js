const mongoose = require('mongoose');

//defining a model
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//create schema
const userSchema = new Schema({
    email:{type:String , required:true,unique:true},
    password:{type:String , required:true}, 
   
})

//create collection/model using this schema
const User =mongoose.model('User',userSchema);

//export
module.exports = User;
