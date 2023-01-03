import {useState} from 'react'
import React  from 'react'
import './form.css'
import { useSignup } from '../hooks/useSignup'

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');

    const {signup, error, isLoading} = useSignup()

    //submit function
    async function handleSubmit(e) {
        e.preventDefault();

        //use signup function 
        await signup(email, password);
    }

  return (
    <div>
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Signup</h3>
            <lable>Email:</lable>
            <input
               type="email" 
               onChange={(e) => setEmail(e.target.value)} 
               value={email} 
            />

            <lable>Password:</lable>
            <input
               type="password" 
               onChange={(e) => setPassword(e.target.value)} 
               value={password} 
            />          
            <button disabled={isLoading}>Signup</button>

            {/* output error */}
            {error && <div className="error">{error}</div>}

        </form>
    </div>
  )
}

export default Signup