const mongoose = require('mongoose')
const productTypeSchema = new mongoose.Schema({
    productType:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    creater:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

const ProductType = mongoose.model('ProductType',productTypeSchema)
module.exports=ProductType