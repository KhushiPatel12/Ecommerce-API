const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const ProductTypeController = require('../controllers/productType')

const app = express()
app.use(router)

router.post('/product/type',auth,ProductTypeController.create_product_type)
router.get('/product/type',auth,ProductTypeController.get_product_type)

module.exports=router