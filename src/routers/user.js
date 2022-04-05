const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const app = express()

const UsersController = require('../controllers/user')

app.use(router)

router.post('/user/register',UsersController.user_register)
router.post('/user/login',UsersController.user_login)
router.post('/user/logout',auth,UsersController.user_logout)
router.get('/user/me',auth,UsersController.user_profile)

module.exports=router
