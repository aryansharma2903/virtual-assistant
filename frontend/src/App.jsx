// the react-dom package is responsible for rendering react components into the DOM
// react-rotuer-dom package
// it allows you to build single-page applications (SPAs) with multiple views (pages) without reloading the browser.

// A Single Page Application (SPA) is a web app or website that:

// Loads just one HTML page when it starts

// Does not reload the page when you navigate between different views (like Home, About, Contact)

// Instead, it dynamically updates the content on the page using JavaScript
// that is.... the DOM remains mounted but React (i.e. JavaScript) re-renders the affected components

// WHAT IS ROUTING IN REACT
// Routing in React refers to the process of managing different views or "pages" of a Single Page Application (SPA) by synchronizing the UI with the URL in the browser's address bar, 
// without requiring a full page reload.

import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { userDataContext } from './context/userContext'
import { Navigate } from 'react-router-dom'
import Customize from './pages/Customize'
import Customize2 from './pages/Customize2'
import Home from './pages/Home'


function App() {
  const {userData, setUserData} = useContext(userDataContext)
  console.log(userData)
  return(
    <Routes>
      {/* if userData is undefined userData?.assistantImage evaluates to undefined without throwing an error */}
      <Route 
        path = '/' 
        element = 
        {
          (userData?.assistantImage && userData?.assistantName)
          ? <Home/>
          : <Navigate to ={"/customize"} />
        }
      />

      <Route path = '/signup' element = {userData ? <Navigate to ={"/"} /> : <SignUp/>} />
      <Route path = '/signin' element = {userData ? <Navigate to ={"/"} /> : <SignIn/>} />
      <Route path = '/customize' element = {!userData ? <Navigate to ={"/signup"} /> : <Customize/>} />
      <Route path = '/customize2' element = {!userData ? <Navigate to ={"/signup"} /> : <Customize2/>} />
    </Routes>
  )
}

export default App
