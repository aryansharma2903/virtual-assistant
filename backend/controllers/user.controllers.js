// this controller gives us the details of the current user using his userId
// we add isAuth middleware in the middle to get the userId
import User from "../models/user.model.js"
import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import moment from "moment"
import { response } from "express";
export const getCurrentUser = async (req, res) => {
    try{
        const userId = req.userId;
        // -password return so that the user obj returned doesnt have password
        const user = await User.findById(userId).select("-password");

        if(!user){
            return res.status(400).json({message: "user not found"});
        }

        return res.status(200).json(user);
    }catch(error){
        console.log(error);
        return res.status(400).json({message: "getCurrentuser error"});
    }
}

export const updateAssistant = async (req, res) => {
    try{
        // imageUrl is obtained here to send the 7 images that we already have on our system to the DB 
        const {assistantName, imageUrl} = req.body
        let assistantImage;

        // this process is done if we input our own image, 
        // cloudinary will send our image to our DB and return a URL
        // we store that string in assistantImage variable
        // we store this string in our DB
        if(req.file){
            assistantImage = await uploadOnCloudinary(req.file.path);
        }else{
            assistantImage = imageUrl
        }
        const user = await User.findByIdAndUpdate(req.userId, {
            assistantName, assistantImage
        }, {new : true}).select("-password")

        return res.status(200).json(user)
    }catch(error){
        return res.status(400).json({message: "updateAssistant error"});
    }
}

export const askToAssistant = async (req, res) => {
    try{
        console.log("askToAssistant controller call ho gaya")
        const {command} = req.body
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(400).json({message: "User not found for this request."});
        }
        const userName = user.name
        const assistantName = user.assistantName
        user.history.push(command);
        await user.save();
        console.log(user.history)

        const result = await geminiResponse(command, assistantName, userName);
        console.log("askToAssistant was called")
        // to confirm that result is a clean json object (every open brace has a closing brace.. etc)
        const jsonMatch = result.match(/{[\s\S]*}/)
        if(!jsonMatch){
            return res.status(400).json({response : "sorry, i can't understand"})
        }
        // parsing the clean string into JSON
        const gemResult = JSON.parse(jsonMatch[0]);
        console.log(gemResult)
        const type = gemResult.type

        switch(type){
            case 'get-date':
                return res.json({
                    type,
                    userInput : gemResult.userInput,
                    response : `Current date is ${moment().format("YYYY-MM-DD")}`
                });
            case 'get-time':
                return res.json({
                    type,
                    userInput : gemResult.userInput,
                    response : `Current time is ${moment().format("hh:mm A")}`
                });
            case 'get-day':
                return res.json({
                    type,
                    userInput : gemResult.userInput,
                    response : `Today is ${moment().format("dddd")}`
                });

            case 'get-month':
                return res.json({
                    type,
                    userInput : gemResult.userInput,
                    response : `Current month is ${moment().format("MMMM")}`
                });
            case 'google-search':
            case 'youtube-search':
            case 'youtube-play':
            case 'general':
            case 'calculator-open':
            case 'instagram-open':
            case 'facebook-open':
            case 'weather-show':
            case 'youtube-open':
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: gemResult.response,
                });
            default:
                return res.status(400).json({response:"I didn't understand the command"})
        }
    }catch(error){
        return res.status(500).json({response : "askToAssistant Error"})
    }
}