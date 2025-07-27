import jwt from "jsonwebtoken"
const genToken = async (userId) => {
    // we write our jwt secret in .env file
    try{
        const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "10d"});
        return token;
    }catch(error){
        console.log(error);
    }
}

export default genToken;