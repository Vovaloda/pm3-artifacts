import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Validation from './LoginValidation';
import axios from "axios";
import { AuthContext } from './context';

function Login(){

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const {setIsAuth, setPlayerId} = useContext(AuthContext);

    const navigate = useNavigate();

    const [errors,setErrors] = useState({});

    const handleInput = (event) =>{ 
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }    

    const handleSubmit = (event) =>{
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);
        if(err.email === "" && err.password === ""){
            axios.post('https://pm3-artifacts.onrender.com/login', values)
            .then(res => {
                if(res.data.msg === "Succes"){
                    setIsAuth(true);
                    setPlayerId(res.data.data1[0].id);
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('playerId', "" + res.data.data1[0].id);
                    navigate('/home');
                }
                else{
                    alert("Check the correctness of the entered data");
                }
            })
            .catch(err => console.log(err));
        }
    }

    return(
            <div className='LoginForm d-flex justify-content-center align-items-center bg-image vh-100'>
                <div className='bg-white p-3 rounded w-25'>
                    <h2>Sign-In</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" placeholder='Enter Email' id='email' name='email' 
                            onChange={handleInput} className='form-control rounded-0'/>
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input type="password" id='password' placeholder='Enter Password' name='password'
                            onChange={handleInput} className='form-control rounded-0'/>
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                        <p>You are agree to our terms and policies</p>
                        <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                    </form>
                </div>
            </div>
    );
}

export default Login;