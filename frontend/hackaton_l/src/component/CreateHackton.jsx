import { useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import {FileText , ArrowDownToLine, FileArchive ,X, } from 'lucide-react'
import axios from 'axios';
import { toast } from "react-toastify";


import { Authentication } from "../store/Authentication";
import Button from "../ui/Button";

const CreateHackton = () => {

  const { loadRegistration, createHackton} = Authentication()

 const [formData, setFormData] = useState({
  title:'',
  description:'',
  startDate:'',
  endDate:'',  
  banner: null,
});



const [previewUrl, setPreviewUrl] = useState(null);


   



  


const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === 'banner') {
    const file = files[0];
    if (file) {
      setFormData({ ...formData, banner: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  
  } else {
    setFormData({ ...formData, [name]: value });
  }
};



const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append('title', formData.title);
  data.append('description', formData.description);
  data.append('startDate', formData.startDate);
  data.append('endDate', formData.endDate);
  data.append('banner', formData.banner);
  // i will 
  await createHackton(data)
};

  return (
    <div className="p-20  h-screen mb-8 m-4">
       {/* <Link to="/home">
            
            <Button variant='blue' size='sm'>home</Button>
            </Link> */}
      <div className="flex flex-col  gap-4  mx-auto  md:flex-row ">
        {/* Profile Card */}
        <div className='flex flex-col gap-1  flex-1'>

          <div className="flex items-start gap-4 bg-white p-6 rounded-xl">
          <div className="relative size-28 bg-blue-950  flex-shrink-0 overflow-visible">
                {/* Profile Image or Placeholder */}
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="relative flex items-center justify-center h-full text-white font-bold">
                    Add Banner
                  </span>
                )}

                {/* "+" Button as Label */}
                <label
                  htmlFor="banner"
                  className="absolute top-0 right-0 z-10 text-white text-xl bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer shadow-md"
                >
                  +
                </label>
          </div>

          <div className="flex flex-col flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              
               <div>
              
              <input  id="title" name="title" placeholder="Title..." onChange={handleChange}  className='border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'/>
   
               </div>
       
       </h2>
            { <input type='text'
               name="description"
               placeholder="description.."
              onChange={handleChange}
              required
             className='border border-gray-300 h-20  px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 '/>}
          </div>
        </div>

         <div className="bg-white p-6 rounded-xl flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Create Hackthon</h2>
                <input
                  type="file"
                  id="banner"
                  name="banner"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
          <label>Start Date</label>
          <input required name="startDate" type="date" placeholder="Start Date" onChange={handleChange} className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <label>End Date</label>
          <input required name="endDate" type="date" placeholder="End Date" onChange={handleChange}  className="border border-gray-300 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
       
     

         
          <button className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition flex items-center justify-center" onClick={handleSubmit}> 
       
         <div className="flex items-center gap-3">
        { loadRegistration && <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />   
         }
         <span>Create Hackton</span>
          
         </div>
          </button>
        </div>


        </div>
   


         
       
      </div>
    </div>
  );
};

export default CreateHackton;
