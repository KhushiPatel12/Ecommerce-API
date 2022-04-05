const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    productType:{
        type:mongoose.Schema.Types.String,
        required:true,
        ref:'ProductType'
    },
    productPrice:{
        type:Number,
        default:0,
        required:true,
        validate(value){
            if(value<0){
                throw new Error('Price must be positive')
            }
        }
    },
    productLikes:[{
        likeUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        isLiked:{
            type:Boolean
        }
    }],
    productComments:[{
        commentUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        comments:[
            {
                type:String,
                trim:true
            }
        ]
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},
{
    timestamps:true
})

const Product = mongoose.model('Product',productSchema)
module.exports=Product