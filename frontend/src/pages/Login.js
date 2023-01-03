import {useState} from 'react'
import React  from 'react'
import './form.css'
import {useLogin} from '../hooks/useLogin'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    const {login, error, isLoading} = useLogin();

    //submit function
    const handleSubmit = async (e) =>{
        e.preventDefault();

        await login(email, password)
    }

  return (
    <div>
        <form className='login' onSubmit={handleSubmit}>
            <h3>Login</h3>
            <lable>Email:</lable>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <lable>Password:</lable>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />          
            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    </div>
  )
}

export default Login