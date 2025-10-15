import express from 'express';
import {upload} from '../lib/config.js'
import { protectRoute } from "../middleware/middleware.js";
import { createProject, getUserProjects } from '../controller/project.controller.js';

const projectRoute = express.Router()



projectRoute.post('/createProject',   upload.fields([
   { name: 'banner', maxCount: 1 },   
]) , protectRoute , createProject)

projectRoute.get('/getUserProjects' ,protectRoute,  getUserProjects)



export default projectRoute;