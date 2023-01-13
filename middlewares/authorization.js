import jwt from "jsonwebtoken";
import validationError from '../Exceptions/validationError'


export const verifyToken = (req, res, next) => {
    console.log("-----Verify Token --------")
    const token = req.headers.token;
    if (token) {
      jwt.verify(token, process.env.HASHED, (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  };

export const verifyTokenAndAdmin = (req, res, next) => {
    try {
        console.log("----verify Token AND ADMIN----")
        verifyToken(req, res, () =>{
            if(req.user.isAdmin){
                next();
            }else{
                res.status(403).json("You are should be ADMIN to do that");
            }
        });
    } catch (e) {
        next(e)
    }
}





