 const Workout = require('../Models/Workout')
const mongoose = require("mongoose")




//get all workout  
const getAllWorkout = async(req, res)=>{
    try{
        const user_id = req.user._id
        //find workout in specific user by id
        const workouts = await Workout.find({user_id}).sort({createAt: -1});
        res.status(200).json(workouts)
    }catch(err){
        res.status(500).json(err)
    }
}

//get a workout 
const getWorkoutById = async (req, res)=>{
    const {id} = req.params;

    //validate id
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "ID invalid"})
    }
    try{
        const workout = await Workout.findById(id)
        if(!workout){
             res.status(404).json({error: "No such workout"})
        }
        res.status(200).json(workout)
    }catch(err){
        res.status(500).json(err)
    }
}


//create a workout  
const createWorkout = async (req, res)=>{
    const {title, reps, load} = req.body;

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: "please fill in all the fields", emptyFields})
    }
    

    try{
        const user_id = req.user._id; //get user id
        const workout = await Workout.create({title, reps, load, user_id}) // create workout object
        res.status(200).json(workout)
    }catch(err){
        res.status(500).json({err: err.message })
    }
}

// delete a workout
const deletWorkout = async (req, res)=>{
    const {id} = req.params;
    try{
        const workout = await Workout.findOneAndDelete({_id: id})
        if(!workout){
            res.status(404).json({error: "No such workout"})
        }
        res.status(200).json(workout)

    }catch(error){
        res.status(500).json(err)
    }
}

//updateWorkout     
const updateWorkout = async (req, res)=>{
    const {id} = req.params;
    try{
        const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body })
        if(!workout){
            res.status(404).json({error: "No such workout"})
        }
        
        res.status(200).json(workout)

    }catch(error){
        res.status(500).json(err)
    }
}




module.exports = {createWorkout, getAllWorkout, getWorkoutById, deletWorkout, updateWorkout}