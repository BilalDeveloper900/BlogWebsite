const jwt=require('jsonwebtoken');

exports.userAuth=async(req,res,next)=>{
    const token=
    req.cookies?.token ||
    req.header('Authorization')?.replace('Bearer ', '')
    if(!token){
        return res.json('Invalid Authorization')
    }else{
        await jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded)=>{
                if (err) {
                    console.log('Invalid Token')
                } else {
                    req.user = decoded
                    next()
                }
            }
        )
    }
}
