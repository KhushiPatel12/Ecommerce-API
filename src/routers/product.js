const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const ProductsController = require('../controllers/product')

const app = express()
app.use(router)

router.post('/product',auth,ProductsController.create_product)
router.patch('/product/:id',auth,ProductsController.update_product)
router.delete('/product/:id',auth,ProductsController.delete_product)
router.get('/product',auth,ProductsController.get_products)
router.get('/productType',auth,ProductsController.get_products_by_types)
router.post('/product/like/:_id', auth,ProductsController.add_like_dislike)
router.post('/product/comment/:_id', auth,ProductsController.add_comment)
router.get('/product/mostliked', auth, ProductsController.get_most_liked_product) 
router.get('/product/mostRecentProduct', auth,ProductsController.get_most_recent_product)


module.exports=router