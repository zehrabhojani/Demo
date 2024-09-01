const express =require('express');
const mongoose =require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors(
    {
        origin:["https://deploy-mern-1whq.vercel.app"],
        methods:["POST","GET"],
        credentials:true
    }
))
app.use(express.json())
mongoose.connect('mongodb+srv://zehrabhojani123:<Zehra123>@demo.em0a6.mongodb.net/test?retryWrites=true&w=majority&appName=Demo')

const RegisterSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const RegisterModel=mongoose.model('register',RegisterSchema)  //register is collection name

app.get("/", (req,res)=>{
    res.json("hello")
}

app.post("/createReg",(req,res)=>{
    const { name, email, password } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(409).json({ message: "Profile already exists" }); // Return 409 conflict status with a message
            } else {
                RegisterModel.create({ name: name, email: email, password: password })
                    .then(user => res.status(201).json({ message: "Account Created" }))
                    .catch(e => res.status(500).json({ message: "Server error" }));
            }
        })
        .catch(err => res.status(500).json({ message: "Server error" }));
})

app.listen(5000,()=>{
    console.log('server is running on port 5000');
})
