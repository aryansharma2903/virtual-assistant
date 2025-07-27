// Your isAuth middleware is designed to protect routes by verifying a JSON Web Token (JWT) stored in the user's browser cookies. 
// If a valid token is found, it confirms the user's identity and allows them to proceed to the next handler in the request chain.

// this middleware finds our token in its cookies
// to generate token we used userID and a JWT secret
// this middleware uses the JWT secret to verify the token
// and finds the userID of the user that generated this token

// if the token exists it means that the userID should be displayed
// and that use must be logged in without requiring a sign-in 
import jwt from "jsonwebtoken"
const isAuth = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            // if the user doesnt have the token that means he is not authenticated
            // tumhare paas token nhi hai to pehle login kro
            return res.status(400).json({message: "token not found"});
        }

        // The jwt.verify method uses the JWT secret to ensure the token hasn't been tampered with and that it was indeed issued by the server.
        // to store an object, once the token is verified an object is returned
        // in which userID is stored along with other stuff
        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

        // adding a new attribute in the request body
        req.userId = verifyToken.userId;

        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "isAuth error"});
    }
}

export default isAuth;