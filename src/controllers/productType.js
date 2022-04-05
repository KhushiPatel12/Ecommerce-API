const ProductType = require('../models/productType')

exports.create_product_type = async(req,res)=>{
    const productType = new ProductType({
        ...req.body,
        creater:req.user._id
    })
    try{
        await productType.save()
        res.status(201).send(productType)
    }catch(e){
        res.status(400).send(e)
    }
}

exports.get_product_type = async(req,res)=>{
    try{
        const productTypes = await ProductType.find()  
        res.send(productTypes)
    }catch(e){
        res.status(500).send(e)
    }
}