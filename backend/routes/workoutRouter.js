const express = require('express');
const router = express.Router();
const Workout = require('../Models/Workout')
const {createWorkout, getAllWorkout, getWorkoutById, 
    deletWorkout, updateWorkout } = require('../controllers/workoutController')

const requireAuth = require("../middleware/requireAuth")

//use middleware to require auth for all workout routes
router.use(requireAuth)

//GET ALL WORKOUTS
router.get("/", getAllWorkout)


//GET SIGLE WORKOUT
router.get("/:id", getWorkoutById)

//Post new workout   
router.post("/", createWorkout)

//DELETE a workout
router.delete("/:id", deletWorkout )

//UPDATE a workout    
router.patch("/:id", updateWorkout )

module.exports= router