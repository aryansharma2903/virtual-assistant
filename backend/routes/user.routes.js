import express from "express"
import { Login, logOut, signUp } from "../controllers/auth.controllers.js";
import { askToAssistant, getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js"
import upload from "../middlewares/multer.js"
import { updateAssistant } from "../controllers/user.controllers.js";

const userRouter = express.Router();

// applying the isAuth middleware
// Route (e.g., router.get('/path', handler), app.post('/path', handler)):

// A Route defines how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP method (GET, POST, PUT, DELETE, etc.).

// It's the specific mapping between a unique combination of:

// HTTP Method (GET, POST, PUT, DELETE, etc.)

// Path (the specific URL segment relative to the router's base path, or the full path if defined directly on app)

// When a request matches both the HTTP method and the path, the associated route handler function(s) (controllers) are executed.
// In Express.js, a Router is a way to modularize and group related routes together. 
// It's like creating a mini Express app for handling specific endpoints.

userRouter.get("/current", isAuth, getCurrentUser);
// upload middleware comes from multer
// when we get an input image multer middleware catches it
// .single(): This is a method provided by Multer to indicate that you are expecting only one file in this specific request.
userRouter.post("/update", isAuth, upload.single("assistantImage"), updateAssistant);
userRouter.post("/asktoassistant", isAuth, askToAssistant);


export default userRouter;