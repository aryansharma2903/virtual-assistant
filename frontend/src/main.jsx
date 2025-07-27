import { StrictMode, useContext } from 'react'
// WHAT IS REACT-DOM PACKAGE?
// react-dom package helps react interact with the browser s' DOM API so that changes in the DOM (not virtual) can be made

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/userContext.jsx'




createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContext>
      <App/>
    </UserContext>
  </BrowserRouter>
)
// DOM => 

// Document: In the context of web browsers, 
// "Document" refers specifically to the HTML document that is loaded in the browser window. 
// This is the raw code (HTML tags, text, attributes) that defines the structure and content of a web page.

// Object: This refers to the concept of objects in programming. 
// An object is a data structure that encapsulates data (properties) and functions (methods) that operate on that data.

// let say intially we have a server running with no code (blank page)
// now you write some code and then you save it....
// consider the HTML file associated with the URL you are on currently in your browser
// this HTML file gets parsed by the browser int a tree like structure
// this tree like structure is composed of nodes that are javascript objects (HTML elements like <h1>, <p>, <div>, etc are converted to objects)
  // these JS objects have properties (element.className, element.innerHTML)
  // they also have Methods (element.appendChild(), element.remove(), element.addEventListener())
// the methods in these objects can directly communicate with the internal engine of the browser (or the rendering engine)
// this rendering engine can then make changes such that the user can actually see these changes
// the DOM API is what exposes these methods to me (the code writer)
// The DOM API is the set of rules, functions, and properties that these very same objects provide for you to interact with them and the overall tree.


// HOOKS AND REACT API => 
// When we say "React API," we're referring to the set of functions, hooks, and components that React provides for you to build UIs. 
// useState and useEffect are prime examples of this.
