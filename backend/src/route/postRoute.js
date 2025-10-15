import express from 'express';
import {upload} from '../lib/config.js'
import { protectRoute } from "../middleware/middleware.js";
import { createPost, getAllPosts } from '../controller/post.controller.js';

const postRoute = express.Router()



postRoute.post('/createPost',   upload.fields([
   { name: 'banner', maxCount: 1 },   
]) , protectRoute , createPost)
postRoute.get('/getAllPosts', getAllPosts)


export default postRoute;