const jsonwebtoken = require('jsonwebtoken');
const checkAuth = async(req,res,next)=>{
    if(!req.cookies.token) return res.render('login');
    const token = req.cookies.token;
    try{
        const decoded = jsonwebtoken.verify(token,process.env.JWT_SECRET);
        return next()
    }
    catch(error){
      return  res.json({msg:`Authentication Failed`}).status(401);
    }

}

module.exports = checkAuth;