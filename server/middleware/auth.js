import jwt from "jsonwebtoken";


export const userAuth = async(req,res,next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:'Not Authorized. Login Again'});
    }
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        if(decodedToken.id){
            req.body.userId = decodedToken.id;
        }else{
            return res.json({success:false,message:'Not Authorized. Login Again'});
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message: error.message});
    }
} 