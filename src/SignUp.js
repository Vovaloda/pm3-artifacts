import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpValidation from './SignUpValidation.js';
import axios from "axios";

function SignUp(){

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const [errors,setErrors] = useState({});

    const handleInput = (event) =>{ 
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }    

    const handleSubmit = (event) =>{
        event.preventDefault();
        const err = SignUpValidation(values);
        setErrors(err);
        if(err.name === "" && err.email === "" && err.password === ""){
            axios.post('https://pm3-artifacts.onrender.com/signup', values)
            .then(res => {
                if(res.data === "Succes"){
                    navigate('/');
                }
                else{
                    alert("Error. Perhaps the user with this email is already registered");
                }
            })
            .catch(err => console.log(err));
        }
    }

    return(
            <div className='LoginForm d-flex justify-content-center align-items-center bg-image vh-100'>
                <div className='bg-white p-3 rounded w-25'>
                    <h2>Sign-Up</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="name"><strong>Name</strong></label>
                            <input type="text" placeholder='Enter Name' id='name' className='form-control rounded-0' name='name'
                            onChange={handleInput}   
                            />
                            {errors.name && <span className='text-danger'>{errors.name}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" placeholder='Enter Email' id='email' className='form-control rounded-0' name='email'
                            onChange={handleInput}
                            />
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input type="password" id='password' placeholder='Enter Password' className='form-control rounded-0' name='password'
                            onChange={handleInput}
                            />
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <button type='submit' className='btn btn-success w-100 rounded-0'>Sign Up</button>
                        <p>You are agree to our terms and policies</p>
                        <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                    </form>
                </div>
            </div>
    );
}

export default SignUp;