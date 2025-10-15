import { useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import {FileText , ArrowDownToLine, FileArchive ,X, } from 'lucide-react'
import axios from 'axios';
import { toast } from "react-toastify";


import { Authentication } from "../store/Authentication";
import Button from "../ui/Button";

const RegisterPage = () => {

  const {register , loadRegistration} = Authentication()

 const [formData, setFormData] = useState({
  fullName:'',
  email:'',
  password:'',
  phoneNumber:'', 
  headline:'',
  about:'',  
  website:'',
  location:'',  
  userType:'', 
  gender:'', 
  profilePicture: null,
});



const [previewUrl, setPreviewUrl] = useState(null);


   



  


const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === 'profilePicture') {
    const file = files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  
  } else {
    setFormData({ ...formData, [name]: value });
  }
};



const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append('fullName', formData.fullName);
  data.append('email', formData.email);
  data.append('password', formData.password);
  data.append('profilePicture', formData.profilePicture);
  data.append('phoneNumber', formData.phoneNumber);
  data.append('headline', formData.headline);
  data.append('about', formData.about);
  data.append('website', formData.website);
  data.append('location', formData.location);
  data.append('userType', formData.userType);
  data.append('gender', formData.gender);
 

  


  await register(data)
};

  return (
    <div className="p-4  h-screen mb-8 m-4">
       {/* <Link to="/home">
            
            <Button variant='blue' size='sm'>home</Button>
            </Link> */}
      <div className="flex flex-col  gap-4  mx-auto  md:flex-row ">
        {/* Profile Card */}
        <div className='flex flex-col gap-1  flex-1'>

          <div className="flex items-start gap-4 bg-white p-6 rounded-xl">
          <div className="relative size-28 bg-blue-950 rounded-full flex-shrink-0 overflow-visible">
                {/* Profile Image or Placeholder */}
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="relative flex items-center justify-center h-full text-white font-bold">
                    No Image
                  </span>
                )}

                {/* "+" Button as Label */}
                <label
                  htmlFor="profileImage"
                  className="absolute -top-1 right-4 z-10 text-white text-xl bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer shadow-md"
                >
                  +
                </label>
          </div>

          <div className="flex flex-col flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              
               <div>
              
              <input required list="options" id="myOptions" name="userType" placeholder="User Type..." onChange={handleChange}  className='border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'/>
                <datalist id="options">
                    <option value="user"/>
                    <option value="company"/>
                    
              </datalist>
               </div>
       
       </h2>
            { <input type='text'
               name="about"
               placeholder="about.."
              onChange={handleChange}
              required
             className='border border-gray-300 h-20  px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 '/>}
          </div>
        </div>

         <div className="bg-white p-6 rounded-xl flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Registration Form</h2>
                <input
                  type="file"
                  id="profileImage"
                  name="profilePicture"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
          <input required name="fullName" type="text" placeholder="Full Name" onChange={handleChange} className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input required name="email" type="email" placeholder="Email" onChange={handleChange}  className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input required name="password" type="password" placeholder="Password"  onChange={handleChange}  className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
         {/* <input name="Directorate" type="text" placeholder="Diractorate" onChange={handleChange}   className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" /> */}
         
     

         
          <button className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition flex items-center justify-center" onClick={handleSubmit}> 
       
         <div className="flex items-center gap-3">
        { loadRegistration && <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />   
         }
         <span>Register</span>
          
         </div>
          </button>
        </div>


        </div>
   


          <div className='flex flex-col gap-2 p-4 flex-1'>
            {/* EMPLOYEE SUPLMENTARY FILE */}
       

   <div className="bg-gradient-to-br from-white via-blue-700/5 to-blue-400/5 border border-gray-200 shadow-sm rounded-xl p-6 w-full max-w-2xl text-gray-800 font-medium flex-1">
   <form className="space-y-4">
    {/* Phone */}
    <div className="flex flex-col">
      <label htmlFor="phoneNumber" className="mb-1 text-sm text-gray-600">Phone</label>
      <input
        required
        onChange={handleChange}
        name="phoneNumber"
        id="phoneNumber"
        type="text"
        placeholder="Phone Number"
        className="border border-gray-300 h-10 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <label htmlFor="website" className="mb-1 text-sm text-gray-600">Website</label>
      <input
        required
        onChange={handleChange}
        name="website"
        id="website"
        type="text"
        placeholder="Website"
        className="border border-gray-300 h-10 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    {/* Date + Gender */}
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col flex-1">
        <label htmlFor="date" className="mb-1 text-sm text-gray-600">Location</label>
        <input
          required
          onChange={handleChange}
          name="location"
          id="location"
          type="text"
          className="border border-gray-300 h-10 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex flex-col flex-1">
      

        <label htmlFor="gender" className="mb-1 text-sm text-gray-600">Gender:</label>
        <select  id="gender" name="gender" required
         onChange={handleChange}
         className="border border-gray-300 h-10 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
          <option value="">-- Select --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>

    {/* Role */}
    <div className="flex flex-col">
      


    </div>

    {/* Employment Type */}
    <div className="flex flex-col">
     


    </div>
  </form>
</div>





     
            
          </div>
       
      </div>
    </div>
  );
};

export default RegisterPage;
