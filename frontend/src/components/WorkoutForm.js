import { useState} from 'react'
import './workoutForm.css'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {useAuthContext} from "../hooks/useAuthContext"

const WorkoutForm = () =>{
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const {dispatch} = useWorkoutsContext();
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!user){
            setError('You must be logged in')
            return 
        }
        //create workout object
        const workout = {title, load, reps}

        //fetch api post req
        const response = await fetch('/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout), //convert object to json string 
            headers: {
                'Content-Type': "application/json",
                'Authorization' : `Bearer ${user.token}`
            }
        })

        //store response as json 
        const json = await response.json();


        //check response
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
            console.log("has error", json)
        }else{
            setTitle("");
            setReps("");
            setLoad("");
            setError(null);
            setEmptyFields([])
            console.log("new workout added", json)
            //dispatch add-workout action to update page
            dispatch({type: 'ADD_WORKOUTS', payload:json})
        }
    }

    return(
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>

            <label>Exercise Title:</label>
            <input type="text"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    className = {emptyFields?.includes('title') ? 'error' : ''}/>

            <label>Load:</label>
            <input type="number"
                    value={load}
                    onChange={(e)=>setLoad(e.target.value)}
                    className = {emptyFields?.includes('load') ? 'error' : ''}/>

            <label>Reps:</label>
            <input type="number"
                    value={reps}
                    onChange={(e)=>setReps(e.target.value)}
                    className = {emptyFields?.includes('reps') ? 'error' : ''}/>


            <button>Submit</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm