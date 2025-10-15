import React from 'react'
import Navbar from './Navbar'
import { Route, Routes } from 'react-router-dom'
import CreateHackton from './CreateHackton'
import HacktonPage from '../Dashboard/HacktonPage'
import ProjectPage from '../Dashboard/ProjectPage'
import Post from '../Dashboard/Post'
import HacktonDetail from './detail/HacktonDetail'
import CreatePost from './CreatePost'
import UserProfile from './detail/UserProfile'

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <Routes>     
        <Route path="/createHackton" element={<CreateHackton />} />
        <Route path="/create_project" element={<CreateHackton />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/post" element={<Post/>} />
        <Route path="/" element={<HacktonPage />} />
        <Route path="/hackton" element={<HacktonPage />} />
        <Route path="/hackton/:id" element={<HacktonDetail />} /> 
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default Dashboard
