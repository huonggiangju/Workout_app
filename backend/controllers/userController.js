const User = require('../Models/User')
const jwt = require('jsonwebtoken')

//create access token 
const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'3d'})
}

//login user    
const loginUser = async (req, res)=>{

    //get email and password in post requests
    const {email, password} = req.body
    try{
        //create new user by calling signup method
        const user = await User.login(email, password)

        //create token      e
        const token = createToken(user._id)
        res.status(200).json({email, token})

    }catch(error){
        res.status(400).json({error: error.message})
    }
   
}


//signup user    
const signupUser = async (req, res)=>{
    const {email, password} = req.body 

    try{
        //create new user by calling signup method
        const user = await User.signup(email, password)

        //create token      
        const token = createToken(user._id)
        res.status(200).json({email, token})

    }catch(error){
        res.status(400).json({error: error.message})
    }
    
}


module.exports ={loginUser, signupUser}