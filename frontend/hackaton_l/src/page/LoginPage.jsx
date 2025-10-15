import React, { useState } from 'react';
import logo from '../assets/logo.jpg' 
import axios from 'axios';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Authentication } from '../store/Authentication';

const LoginPage = () => {
  const [formData, setFormData] = useState({  
    email: '',
    password: ''   
  });

  const [resateForm , setResateForm] = useState({
    email:''
  })

  const [forgetPassword , setForgete] = useState(false)


  const {login , PasswordResateRequest} = Authentication();

  

  const handleChange = (e) => {
    const { name, value } = e.target;  
      setFormData({ ...formData, [name]: value });    
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();    
   
    // const res = await  axios.post('http://localhost:5000/employee/login', formData)
    login(formData)  
   
  }



  return (
    <div className='flex'>
     <div className='flex items-center justify-center flex-1'>
         <div className="flex flex-col w-72 gap-y-4 m-8">

          { <div>
            
             <div className="flex flex-col w-72 gap-y-4 m-8">
    <p>Login to your credentials</p>
      <input
        type="text"
        className="border-1 border-gray-400 h-10  px-2 py-1 rounded"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
      />
      <input
        type="password"
        className="border-1 border-gray-400 h-10  px-2 py-1 rounded"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
      />

      <p
        onClick={() => setForgete(!forgetPassword)}
        className="cursor-pointer text-gray-600 hover:text-indigo-600 hover:underline transition duration-200"
      >
        Don't have account?   <Link to='/signup'>
            Register
            
            </Link>
      </p>
      <button
        onClick={handleSubmmit}
        className="bg-blue-500 h-10 text-white py-1 rounded hover:bg-blue-600 transition"
      >
        Login
      </button>
    </div> 
            </div>}
   
  
     
    

 
    </div>
      </div> 
            
        <div className='flex bg-gradient-to-tr from-blue-950 via-blue-600 to-blue-700 300 flex-1 h-screen justify-center items-center'>
          <div className='w-64 h-72 rounded-lg shadow-2xl shadow-cyan-500 hover:shadow-white bg-white/20 backdrop-blur-md border border-white/30 '>
            <img src={logo} alt="logo" className="w-full h-full object-cover rounded-lg opacity-90" />
          </div>
        </div>

    
    </div>
    
   
  );
};

export default LoginPage;
