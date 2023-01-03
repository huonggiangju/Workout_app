const express = require('express')
const dotenv = require('dotenv')
const workoutRoutes = require("./routes/workoutRouter")
const userRoutes = require("./routes/userRouter")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

//connect DB 
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        //listen port   
        app.listen(process.env.PORT, () =>{
            console.log("connected Db, listen port 8000")
        })
    })
    .catch((err) => console.log(err))

//use middleware
app.use(express.json())
app.use(bodyParser.json());


//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user', userRoutes)


