const mongoose=require("mongoose")

const homeProducts=new mongoose.Schema({
    title:String,
    description:String,
    imagePath: String,
    price:Number,
    offer:Number,
    size:String
})
const MensProduct=mongoose.model('MensFashion',homeProducts)
module.exports=MensProduct