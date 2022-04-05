const ProductType = require('../models/productType')
const Product = require('../models/product')

exports.create_product = async(req,res)=>{
    const productType = req.body.productType
    try{
        const type = await ProductType.findOne({productType:productType})
        if(!type){
            throw new Error({error:"Product Type not exist"})
        }
        const product = new Product({
            ...req.body,
            owner:req.user._id
        })
        await product.save()
        res.status(201).send(product)
    }catch(e){
        res.status(400).send(error)
    }
}

exports.update_product = async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['productName','productPrice','productType']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates'})
    }
    try {
        const product = await Product.findOne({_id:req.params.id,owner:req.user.id})
        if(!product){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            product[update]=req.body[update]
        })
        await product.save()
        
        res.send(product)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.delete_product = async(req,res)=>{
    try{
        const product = await Product.findOneAndDelete({_id:req.params.id,owner:req.user.id})
        if(!product){
           return res.status(404).send()
        }
        res.send(product) 
    }catch(error){
        res.status(500).send(error)
    }
}

exports.get_products = async(req,res)=>{
    try{
        const product = await Product.find()  
        res.send(product)
    }catch(e){
        res.status(500).send(e)
    }
}

exports.get_products_by_types = async(req,res)=>{
    const type = req.body.productType 
    try{
        const product = await Product.find({ productType:type})
        if(!product){
           return res.status(404).send({error:"Product not exist"})
        }
        res.send(product) 
    }catch(error){
        res.status(500).send(error)
    }
}

exports.add_like_dislike = async (req, res) => {
    try {
        const productData = await Product.findById({ _id: req.params._id });
        if (!productData){
            throw new Error("Product not found ")
        } 
        const data = productData.productLikes.findIndex(item => item.likeUserId == (req.user._id).toString())
        if (data === -1) {
            productData.productLikes = productData.productLikes.concat({ likeUserId: req.user._id, isLiked: true })
        } else {
            productData.productLikes[data].isLiked = !productData.productLikes[data].isLiked
        }
        const like = await productData.save();
        res.status(200).send({ message: `successful ${like.productLikes[data].isLiked ? "like" : "dislike"}` })
    } catch (e) {
        res.status(400).send({ error: e.message.toString() })
    }
}

exports.add_comment = async (req, res) => {
    try {
        const productData = await Product.findById({ _id: req.params._id });
        if (!productData){
            throw new Error("Product not found ")
        } 
        productData.productComments = productData.productComments.concat({ commentUserId: req.user._id, comments: req.body.comments })
        const comment = await productData.save();
        res.status(200).send({ message: "successful comment", data: comment })
    } catch (e) {
        res.status(400).send({ error: e.message.toString() })
    }
}

exports.get_most_liked_product = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products){
            throw new Error("Product not found")
        } 
        const filteredProducts = products.map((product) => {
            return ({
                product, 
                totalLikes: product.productLikes.filter(item => item.isLiked === true).length 
            })
        })
        filteredProducts.sort((a, b) => a.totalLikes < b.totalLikes ? 1 : -1)
        const mostlike = filteredProducts.filter((product)=>{ return filteredProducts[0].totalLikes == product.totalLikes})
        res.status(200).send(mostlike)
    } catch (e) {
        res.status(400).send({ error: e.message.toString() })
    }
}

exports.get_most_recent_product =  async (req, res) => {
    try {
        const products = await Product.find();
        if (!products){
            throw new Error("Product not found ")
        } 
        products.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
        res.status(200).send(products[0])
    } catch (e) {
        res.status(400).send({ error: e.message.toString() })
    }
}

