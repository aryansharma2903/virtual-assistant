import React, {useState, useRef, useContext} from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { RiImageAddLine } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
function Customize() {
    const {serverUrl, userData, setUserData, 
        frontendImage, setFrontendImage, 
        backendImage, setBackendImage, 
        selectedImage, setSelectedImage
    } = useContext(userDataContext)
    const inputImage = useRef();

    const navigate = useNavigate()

    const handleImage = (e) => {
        // to get the file we uploaded using the input tag
        const file = e.target.files[0]
        console.log(file);
        setBackendImage(file);
        // we are coverting file into URL
        // URL is a class .createObjectURL is a function
        // converts file object into URL
        setFrontendImage(URL.createObjectURL(file))

    }

    return(
        <div className = 'w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-[20px]'>
            {/* flex-wrap tells the flex container to allow its items to wrap onto the next line if there isn't enough horizontal space to accommodate all of them on one line. This is crucial for responsive design, as it prevents content from overflowing and ensures items stack neatly on smaller screens. */}
            <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer'
                onClick={
                    () => {
                        navigate("/")
                    }
                }
            />
            <h1 className = 'text-white mb-[30px] text-[30px] text-center'>Select your <span className = 'text-blue-200'>Assistant Image</span></h1>
            <div className = 'w-full max-w-[60%] flex justify-center items-center flex-wrap gap-[15px]'>
                <Card image = {image1}/>
                <Card image = {image2}/>
                <Card image = {image3}/>
                <Card image = {image4}/>
                <Card image = {image5}/>
                <Card image = {image6}/>
                <Card image = {image7}/>
                {/* through the onClick event handler we are pragrammatically triggering click of the input tag (which is accessed using a ref (inputImage) )*/}
                {/* after click a file selection dialog box opens, and we can select our desired image */}
                <div className = {`
                    w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-white flex items-center justify-center
                    ${selectedImage === "input" ? "border-4 border-white shadow-2xl shadow-blue-950" : null}
                `}
                onClick={
                    () => {
                        inputImage.current.click()
                        setSelectedImage("input")
                    }
                }
                >
                    {!frontendImage && <RiImageAddLine className = 'text-white w-[25px] h-[25px]'/>}
                    {frontendImage && <img src = {frontendImage} className = 'h-full object-cover' />}
                </div>
                <input type = "file" accept = 'image/*' ref = {inputImage} hidden onChange={handleImage}/>
            </div>
            {selectedImage && <button className = 'min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px] cursor-pointer' onClick={()=>navigate("/customize2")}>Next</button>}
    
        </div>
    )
}

export default Customize