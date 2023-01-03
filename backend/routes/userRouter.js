const router = require('express').Router()
const {loginUser, signupUser} = require( '../controllers/userController')


//login router  
router.post('/login',loginUser)


//signup route
router.post('/signup',signupUser)

module.exports = router