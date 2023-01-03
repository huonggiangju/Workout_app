import React  from 'react'
import {useEffect} from 'react'
import WorkoutDetail from '../components/WorkoutDetail'
import './home.css'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {useAuthContext} from "../hooks/useAuthContext"

function Home() {

  //comsumer context
  const { workouts, dispatch} = useWorkoutsContext();
  const {user} = useAuthContext();

  useEffect(()=>{
    
    const fetchWorkout = async()=>{
      const response = await fetch('/api/workouts', {
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'SET_WORKOUTS', payload:json})
      }
    }

    //call function if user exists
    if(user){
        fetchWorkout()
    }

  }, [dispatch, user])

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && workouts.map((workout)=>(
          <WorkoutDetail key={workout._id} workout={workout}></WorkoutDetail>
        ))}
      </div>
      <WorkoutForm></WorkoutForm>
    </div>
  )
}

export default Home