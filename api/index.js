import express from 'express' ; 
import authroutes from "./routes/auth.js"
import postroutes from "./routes/posts.js"
import userroutes from "./routes/users.js"
import cookieParser from 'cookie-parser';
import multer from "multer" ; 


const app = express() 

app.use(express.json()) ; 
app.use(cookieParser()) ; 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../my-app/public/upload')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now() + file.originalname)
    }
  })

  
const upload = multer({ dest: './uploads'})
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file  = req.file
    res.status(200).json(file.filename)
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

app.use("/api/auth" , authroutes)
app.use("/api/posts" , postroutes)
app.use("/api/users" , userroutes)

//making api requests using app.get() ; 

// app.get("/test" , (req,res) =>{
//     res.json("It works !!")
// })
//Instead of writing all api requests here we are separating them into the aith , posts users etc . 

app.listen(8800 , () =>{
    console.log("Connected !!");
});
