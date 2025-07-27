import React, {useState, useContext} from 'react'
import bg from "../assets/authBg.png"
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { userDataContext } from '../context/userContext';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const {serverUrl, userData, setUserData} = useContext(userDataContext);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false);


  //   When we talk about APIs in web dev, especially when using axios, we're referring to:
  // 👉 A URL (like https://api.example.com/users) that allows your app to communicate with a server to get or send data.

  // bhaiya said ?no lets fetch API for signUp"
  // "Let’s make a request to our backend API endpoint that handles user sign-up, usually using fetch() or axios()."
  // for that we need server URL
  // to get server URL we use the useContext hook, the provider component has been defined in '../context/userContext'

  // without a CORS policy in your backend you will get error
  // AxiosError {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest, …}
  // SignUp.jsx:29 
  // POST http:localhost:8000/api/auth/signup net::ERR_CONNECTION_REFUSED

  const handleSignUp = async (e) => {
    // generally a form refreshes when you hit the submit button
    // this line prevents that
    e.preventDefault()
    setErr("");
    setLoading(true);
    try{
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`, 
        {name, email, password},
        // so that token generated on signUp gets easily parsed into cookies
        {withCredentials : true}
      );
      console.log(result.data);
      setUserData(result.data);
      setLoading(false);
      navigate("/customize")
    }catch(error){
      console.log(error);
      setUserData(null);
      setLoading(false);
      setErr(error.response.data.message);
    }
  }

  return(
    <div 
      className = 'w-full h-[100vh] bg-cover flex justify-center items-center' 
      style={{backgroundImage: `url(${bg})`}}
    >
      {/* bg-[#00000062]  Applies a semi-transparent black background using a hex color with alpha */}
      {/*backdrop Applies a blur effect to the background behind the form (like a frosted glass effect). Works with transparency. */}
      {/* shadow-lg  Adds a large box shadow around the form for a 3D elevated look.*/}
      {/* shadow-black  Makes the shadow color black (default is a semi-transparent gray). */}
      {/* flex-col Sets flex direction to column → children stack vertically. */}
      {/* items-center Centers child elements along the cross axis, which is horizontal in flex-col. So: centers children horizontally. */}
      {/* justify-center Centers children along the main axis, which is vertical in flex-col. So: centers children vertically within the 600px height.*/}
      {/* outline-none Removes the default blue outline shown when the input is focused.*/}
      {/* bg-transparent  Background is transparent, so the parent background (e.g., image) shows through.*/}
      {/* absolute : the element will be positioned relative to its nearest ancestor with position: relative, absolute, fixed, or sticky. */}
      {/* top-[20px] Moves the icon 20px from the top of its absolutely positioned parent.*/}
      {/* right-[20px] Moves the icon 20px from the right side of the parent.*/}
      <form className = 'w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]'
      onSubmit={handleSignUp}
      >
        <h1 className = "text-white text-[30px] font-semibold mb-[30px]">
          Register to <span className='text-blue-400'>Virtual Assistant</span>
        </h1>
        <input type = "text" placeholder= 'Enter your Name'
        className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        required
        onChange = {(e) => setName(e.target.value)}
        value = {name}
        />
        <input type = "email" placeholder= 'Email'
        className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full"
        required
        onChange = {(e) => setEmail(e.target.value)}
        value = {email}
        />
        <div className = 'w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
          <input type = {showPassword ? "text" : "password"} placeholder = 'password' 
          className = "w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]"
          required
          onChange = {(e) => setPassword(e.target.value)}
          value = {password}
          /> 
          {
            !showPassword && 
            <IoEye className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer ' 
            onClick = {() => setShowPassword(true)}/>
          }
          {
            showPassword && 
            <IoEyeOff className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer ' 
            onClick = {() => setShowPassword(false)}/>
          }
        </div>
        {err.length > 0 && 
        <p className = 'text-red-500 text-[17px]'>*{err}</p>
        }
        <button className = 'min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px]' disabled = {loading}>{loading? "Loading..." : "SignUp"}</button>
        <p className='text-white text-[18px] cursor-pointer' onClick={() => navigate("/signin")}>Already have an account? <span className='text-blue-400'>Sign in</span> </p>
      </form> 
    </div>
  )
}

export default SignUp