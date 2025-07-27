import multer from "multer"

// try{
//     const storage = multer.diskStorage({
//         // cb is callback
//         destination: (req, file, cb) => {
//             // second arguement of cb is the destination where image is to be stored
//             cb(null, "../public")
//         },
//         filename : (req, file, cb) => {
//             cb(null, file.originalname);
//         }
//     })
// }catch(error){
//     res.status(500).json({message : "multer error"})
// }
const storage = multer.diskStorage({
    // cb is callback
    destination: (req, file, cb) => {
        // second arguement of cb is the destination where image is to be stored
        cb(null, "./public")
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage});

export default upload;