const mongoose=require("mongoose");
const DB="mongodb://localhost:27017/dreamapp";
// const DB=process.env.DATABASE;//mongodb atlas   
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true  //stable connection
}).then(()=>console.log("connection Sucessfull"))
.catch((err)=>console.log(err));
