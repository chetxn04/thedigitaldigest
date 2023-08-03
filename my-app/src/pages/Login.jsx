import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios' ; 
import { AuthContext } from '../context/authContext';


const Login = () => {
    const [input,setInputs] = useState({
        username:"",
        password:"",
    })

    const [err,setError] = useState(null)   ;

    const navigate = useNavigate() ; 

    const {login} = useContext(AuthContext) ; 

    const handleChange = e => {
        setInputs(prev => ({...prev , [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            await login(input)
            navigate("/"); 
        }catch(err){
            setError(err.response.data);
        }
    };

    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="username" name="username" onChange={handleChange}></input>
                <input type="password" placeholder="password" name = "password" onChange={handleChange}></input>
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
                <span>Don't have an account ? <Link to="/register">Register</Link></span>
            </form>
        </div>
    )
}

export default Login