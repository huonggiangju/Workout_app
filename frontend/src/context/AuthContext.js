import {createContext, useReducer, useEffect} from 'react'

//create context
const AuthContext =  createContext();


//create authReducer
const authReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

//create authContextProvider
const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(authReducer, {
        user:null  //initial state
    })

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    console.log("AuthContext state: ", state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider, authReducer}