const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, require: true}
})


//static signup method 
userSchema.statics.signup = async function (email, password){

    //validation     
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if( !validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    //check email in db
    const exists = await this.findOne({email}) 
    if(exists){
        throw Error('Email already in use')
    }
    //hashing password    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //create new user with hashing password
    const user = await this.create({email, password: hash}) 
    return user
    
}

//login method 
userSchema.statics.login = async function (email, password){
    
    if(!email || !password){
        throw Error('All field mus be filled')
    }

    //check user exists
    const user = await this.findOne({email});
    if(!user){
        throw Error('Incorrect email')
    }

    //compare typed password with user password
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }

    return user;
}

module.exports = mongoose.model('User', userSchema)