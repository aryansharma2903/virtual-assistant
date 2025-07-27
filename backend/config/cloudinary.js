// code copy pasted from cloudinary website and modfied slightly
// Cloudinary is a cloud-based media management platform that helps developers and businesses upload, store, transform, optimize, and deliver images and videos efficiently across websites and applications.
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

// we need the filepath of the image that we have to send to cloudinary

// how exactly is the image uploaded?
// 1.) we send an image from the front-end
// 2.) the multer middleware stores the image in the public folder
// 3.) whenever uploadOnCloudinary function is called in the controller, the image gets permanently uploaded, and then deleted from the permanent folder
// 4.) the URL we get must be stored in our DB
const uploadOnCloudinary = async (filePath) => {
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET,  // Click 'View API Keys' above to copy your API secret
    });

    try{
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(filePath)
        // to delete the file at the path synchronously
        fs.unlinkSync(filePath);
        console.log(uploadResult);
        return uploadResult.secure_url;
    }catch(error){
        fs.unlinkSync(filePath);
        res.status(500).json({message: "cloudinary error"});
    }
}

export default uploadOnCloudinary