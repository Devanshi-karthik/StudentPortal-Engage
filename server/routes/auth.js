const express=require('express')
const User=require('../models/User')
const router =express.Router();
const Joi= require('@hapi/joi')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


//validations
const schema=Joi.object({
    username :Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(5).required()
})

const loginschema=Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(5).required()
})

//Register a User
router.post('/register',async(req,res)=>{
    
    const {error}=schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //check if email already exists
    const exist = await User.findOne({email:req.body.email})
    if (exist) return res.status(400).send('Email already exists')

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashpassword= await bcrypt.hash(req.body.password,salt)


        const user=new User({
        username:req.body.username,
        email:req.body.email,
        password: hashpassword
    });
    try{
        console.log(req.body)
        const saveduser=await user.save();
        res.json(saveduser);
    }catch(error){
        res.json({message:error})

    }
})

//Login a User

router.post('/login',async(req,res)=>{
    const {error}=loginschema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const exist = await User.findOne({email:req.body.email})
    console.log(exist)
    if (!exist) return res.status(400).send('Email does not exists')

    const valid=await bcrypt.compare(req.body.password,exist.password)
    if (!valid) return res.status(400).send('Invalid Password')


    //create Token
    const token=jwt.sign({_id:exist._id},'Devanshi')
    res.header('auth-token',token).json({token,exist})

    // res.send('Logged In')




})

module.exports=router