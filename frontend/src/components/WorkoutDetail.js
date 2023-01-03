import React from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {useAuthContext} from "../hooks/useAuthContext"

const WorkoutDetail = ({workout}) =>{
    //call global context   
    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    

    //delete click
    const handleDeleteClick = async()=>{
        if(!user){
            return
        }
        const response = await fetch('/api/workouts/' + workout._id, {
            method : 'DELETE',
            headers: {
                'Authorization' : `Bearer ${user.token}`
              }
        })

        //store response as json 
        const json = await response.json()

        //check response
        if(response.ok){
            dispatch({type: 'DELETE_WORKOUTS', payload:json})
        }
    }

    //update clicks
    const handleUpdateClick = async()=>{
        const response = await fetch('/api/workouts/' + workout._id, {
            method: "PATCH"
        })

        //store response as json 
        const json = await response.json()

        //check response
        if(response.ok){
            dispatch({type: 'UPDATE_WORKOUTS', payload:json})
        }
    }

    return (
       
            <div className="workout-details">
                <h4>{workout.title}</h4>
                <p><strong>Load (kg):</strong> {workout.load}</p>
                <p><strong>Reps: </strong> {workout.reps}</p>
                <p>{formatDistanceToNow(new Date(workout.createdAt), 
                {addSuffix: true})}</p>
                

                {/* <span onClick={handleUpdateClick}>Update</span> */}
                <br></br>
                <span className="material-symbols-outlined" onClick={handleDeleteClick}>Delete</span>
            </div>
       
    )
}

export default WorkoutDetail