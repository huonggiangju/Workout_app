import { createContext, useReducer} from 'react';


//create context 
const WorkoutsContext = createContext();


//create reducers  
const workoutsReducer = (state, action) =>{
    switch(action.type){
        case 'SET_WORKOUTS':
            return {workouts: action.payload}
        case 'ADD_WORKOUTS':
            return {workouts: [action.payload, ...state.workouts]}
        case 'DELETE_WORKOUTS':
            return {workouts: state.workouts.filter((w)=> w._id !== action.payload._id)}
        case 'UPDATE_WORKOUTS':
            const indexOfWorkout = state.findIndex(w => w._id === action.payload._id);
            let newState = [...state];
            newState[indexOfWorkout] = action.payload;
            return newState;
        default:
            return state;
    }
}

//create context provider component
const WorkoutContextProvider = ({children})=>{

    const [state, dispatch] = useReducer(workoutsReducer, 
                                 {workouts: null   //workoutReducer and inital state
    }) 


    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}

export {WorkoutsContext, WorkoutContextProvider, workoutsReducer}