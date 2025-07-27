// this file is used to connect our DB 
import mongoose from 'mongoose'
const connectDb = async () => {
    try{
        // connecting our DB through mongoose
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db connected");
    }catch(error){
        console.log(error);
    }
}

export default connectDb;