import express from "express";
import { createHackathon, 
   login, 
   register , 
   checkAuth , 
   getHackathonsByCompany, 
   getHackathonById , 
   getAllHackathons , 
   applyToHackathon , 
   acceptParticipant,
   getUserProfile,
 getNotifications,
  markNotificationsRead,} from "../controller/user.controller.js";
import {upload} from '../lib/config.js'
import { protectRoute } from "../middleware/middleware.js";

const userRoute = express.Router()

userRoute.post('/register', upload.fields([
   { name: 'profilePicture', maxCount: 1 },
   { name: 'SupplementaryFile', maxCount: 20 }
]) , register)

userRoute.post('/login' , login)
userRoute.post('/createHackton',   upload.fields([
   { name: 'banner', maxCount: 1 },   
]) , protectRoute , createHackathon)
userRoute.get('/currentUser',protectRoute , checkAuth)
userRoute.get('/getUserProfile/:userId',protectRoute , getUserProfile)
userRoute.get('/getHacktonByCampany',protectRoute , getHackathonsByCompany)
userRoute.get('/getAllHackathons' , getAllHackathons)
userRoute.get('/hackton/:id',protectRoute , getHackathonById)
userRoute.post('/hackton/apply/:hackathonId', protectRoute, applyToHackathon);
// backend/src/routes/userRoutes.js
userRoute.post(
  "/hackathon/accept/:hackathonId/:userId",
  protectRoute,
  acceptParticipant
);
// ✅ Get notifications
userRoute.get("/notifications", protectRoute, getNotifications);

// ✅ Mark as read
userRoute.put("/notifications/read", protectRoute, markNotificationsRead);


export default userRoute;