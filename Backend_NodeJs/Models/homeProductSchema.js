const mongoose=require("mongoose")

const homeProducts=new mongoose.Schema({
    title:String,
    description:String,
    imagePath: String
})
const HomePageProduct=mongoose.model('HomeProducts',homeProducts)
module.exports=HomePageProduct