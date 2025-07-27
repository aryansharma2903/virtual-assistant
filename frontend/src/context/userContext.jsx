import React, {createContext, useEffect, useState} from 'react'
// creating a context that we will send to other components
export const userDataContext = createContext();
import axios from "axios"
// refer to main.jsx
// so far i think this is going to be the main provider component for all variables throughout the app


// The children prop is a special prop that React automatically provides to components. 
// It represents whatever is rendered between the opening and closing tags of your component when you use it in JSX.
function userContext({children}) {
    const serverUrl = "https://virtualassistant-backend-mcqt.onrender.com"
    const [userData, setUserData] = useState(null);
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleCurrentUser = async() => {
        try{
            const result = await axios.get(
                `${serverUrl}/api/user/current`,
                {withCredentials : true}
            );
            setUserData(result.data);
            console.log(result.data);
        }catch(error){
            console.log(error);
        }
    }
    const getGeminiResponse = async (command) => {
        // console.log("command ye aaya....", command)
        try{
            const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, {command}, {withCredentials : true})
            return result.data
        }catch(error){
            console.log("getGeminiResponse kaam nhi kr rha")
            console.log(error)
        }
    }

    useEffect(() => {
        handleCurrentUser()
    }, [])

    const value = {
        serverUrl, userData, setUserData, 
        frontendImage, setFrontendImage, 
        backendImage, setBackendImage, 
        selectedImage, setSelectedImage,
        getGeminiResponse
    }
    return(
        <>
            <userDataContext.Provider value = {value}>
                {children}
            </userDataContext.Provider>
        </>
    )
}

export default userContext;
