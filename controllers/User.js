const User =  require('../models/User.js');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.createUser = async (req,res,next) =>{
        const {email,password,confirmPassword,role} = req.body;
        if(password !== confirmPassword){
            res.json({msg:'Passwords donot match'}).status(422)
        }
        if(password.length<8){
            res.json({msg:'Password should have a minimum length of 8 characters'}).status(422)
        }

        let hash;

      bcrypt.genSalt(saltRounds).then(salt=>{
            bcrypt.hash(password,salt).then(async(hashed)=>{
                hash = hashed;
                try{
                    const user = await User.create({email,password:hash,role});
                    res.json({msg:`User Created Successfully`,user:user.email})
                }
                catch(error){
                    res.json(error);
                }
            })
        }).catch(err=>res.json(err));    


        
}

exports.loginUser = async(req,res,next) =>{
    const {email,password} = req.body;

    console.log(email,password)

    try{
        const user = await User.findOne({where:{email}})
        bcrypt.compare(password,user.password).then(result=>{
            if(result){
                const token = jwt.sign({user:user.email},process.env.JWT_SECRET,{expiresIn:"200m"});
                res.cookie('token',token,{maxAge:900000,httpOnly:true})
                res.json({user:user.email})
            }
            else{
                res.json(`Unauthorized`).status(401);
            }
        })
    }
    catch(error){
        res.json(error)
    }
}

exports.refreshToken = async(res,req,next)=>{

            jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err) throw err;        
                    const token = jwt.sign({user:decoded.user.email},process.env.JWT_SECRET,{expiresIn:"200m"});
                    res.cookie('token',token,{maxAge:900000,httpOnly:true})
                    res.json({msg:'Refreshed'})
            })
        

}

exports.logout = async(req,res,next)=>{
    res.cookie('token','',{maxAge:0})
    res.json({msg:'Logout Successfull'})
}