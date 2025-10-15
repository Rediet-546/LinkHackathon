import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import Hackathon from '../model/hackton.js';
import Project from "../model/project.js";
import Post from "../model/post.js";
import Notification from '../model/notification.js';




export async function getUserProfile(req, res) {
  try {
    const userId = req.params.userId;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch user's projects
    const projects = await Project.find({ userId }).sort({ createdAt: -1 });

    // Fetch user's posts
    const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

    // Fetch hackathons where user is company OR participant
    const hackathons = await Hackathon.find({
      $or: [
        { "participants.user": userId },
        { company: userId }
      ]
    })
      .populate("company", "fullName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      user,
      projects,
      posts,
      hackathons
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}



export async function register(req, res) {
  console.log('register reached ')
 const {  
  fullName,
  email,
  password,
  phoneNumber, 
  about,  
  website,
  location,  
  userType, 
  gender, 
  
} = req.body;

console.log(req.body)

 
 const profilePicture = req.files?.profilePicture?.[0] || null;

 

  try {
     
    const allFieldValue =  [
        fullName,
        email,
        password,
        phoneNumber,        
        about,  
        website,
        location,  
        userType, 
        gender, 
    ];


  

    if (allFieldValue.some(field => !field || field.length === 0)) {
      return res.status(400).json({ message: "All fields are required" });
    }  

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }


    const hashedPassword = await bcrypt.hash(password , 10);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists, please use a diffrent one" });
    }  
  

    let profilePictureBase64 = null;

    if (req.files?.profilePicture?.[0]) {
      const file = req.files.profilePicture[0];
      // Convert to base64 string with content type
      profilePictureBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    }
   


    const newUser = new User({  
        fullName,
        email,
        password:hashedPassword,
        phoneNumber, 
       
        about,  
        website,
        location,  
        userType, 
        gender, 
        profilePicture:profilePictureBase64,

      });

   await newUser.save();

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks,
    sameSite: "strict", // prevent CSRF attacks
    secure: process.env.NODE_ENV === "production",
  });


     res.status(200).json({ message: "Registered successfully"});

  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



export async function login(req , res){
  console.log('inside employee login page')

  try{
  const {email , password} = req.body
  console.log(password)
  console.log(email)

  if(!email || !password) return  res.status(400).json({message: 'all fields are required'})
   

  const user = await User.findOne({email})
  if(!user) return  res.status(401).json({message:'invalid email or password'})

  const bcryptPasswordChack = await bcrypt.compare(password , user.password);
  if(!bcryptPasswordChack) return res.status(401).json({message: 'invalid email or password p'});

 
    // for token 
    // 1 user id 
    // 2 secret key 
    // 3 expiration date 
  const token = jwt.sign({employeeId: user._id} , process.env.JWT_SECRET_KEY , {
    expiresIn:"2d",
  })

  console.log('token prepared')

  res.cookie('jwt', token , {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
  })

  console.log('token send successfully')

  res.status(200).json({ success: true, user });

  }catch(error){
    // console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }  

   
}




// Create a new hackathon
export async function createHackathon(req, res) {
 
  try {
    const { title, description, startDate, endDate } = req.body;

    // Check required fields
    if (!title || !description || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    if (start > end) {
      return res.status(400).json({ message: "Start date must be before end date" });
    }

    // The company user should be authenticated; assume userId is from JWT
    const companyId = req.user._id // Make sure your auth middleware sets req.userId
    const company = await User.findById(companyId);

    console.log('user type ' + company.userType)

    if (!company || company.userType !== "company") {
      return res.status(403).json({ message: "Only company users can create hackathons" });
    }
     let bannerBase64 = null;

    if (req.files?.banner?.[0]) {
      const file = req.files.banner[0];
      // Convert to base64 string with content type
      bannerBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    }

    // Create Hackathon
    const newHackathon = new Hackathon({
      banner:bannerBase64,
      title,
      description,
      company: companyId,
      startDate: start,
      endDate: end,
      participants: [] // Initially empty
    });

    await newHackathon.save();

    res.status(201).json({
      message: "Hackathon created successfully",
      hackathon: newHackathon
    });

  } catch (error) {
    console.error("Error creating hackathon:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}




export async function getHackathonsByCompany(req, res) {
  try {
    // Get company ID from authenticated user
    const companyId = req.user._id

    if (!companyId) {
      return res.status(401).json({ message: "Unauthorized: no company ID found" });
    }

    // Find the company user
    const company = await User.findById(companyId);
    if (!company || company.userType !== "company") {
      return res.status(403).json({ message: "Only company users can access their hackathons" });
    }

    // Find all hackathons created by this company
    const hackathons = await Hackathon.find({ company: companyId })
      .sort({ createdAt: -1 }) // latest first
      .lean();

    // If no hackathons found
    if (!hackathons || hackathons.length === 0) {
      return res.status(404).json({ message: "No hackathons found for this company" });
    }

    // Return list
    return res.status(200).json({
      message: "Hackathons fetched successfully",
      total: hackathons.length,
      hackathons,
    });

  } catch (error) {
    console.error("Error fetching hackathons by company:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}





export async function getHackathonById(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Hackathon ID is required" });
    }

    // Fetch hackathon info
    const hackathon = await Hackathon.findById(id)
      .populate('company', 'fullName email') // populate company info
      .populate({
        path: 'participants.user',
        select: 'fullName email' // populate participants
      })
      .lean();

    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    // Fetch projects separately by hackathonId
    const projects = await Project.find({ hackathonId: id }).lean();

    return res.status(200).json({
      message: "Hackathon fetched successfully",
      hackathon: {
        ...hackathon,
        projects // attach projects list
      }
    });

  } catch (error) {
    console.error("Error fetching hackathon by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}





export async function getAllHackathons(req, res) {
  try {
    // Fetch all hackathons
    const hackathons = await Hackathon.find()
      .populate('company', 'fullName email') // populate company name/email
      .sort({ createdAt: -1 }) // latest first
      .lean();

    if (!hackathons || hackathons.length === 0) {
      return res.status(404).json({ message: "No hackathons found" });
    }

    return res.status(200).json({
      message: "Hackathons fetched successfully",
      total: hackathons.length,
      hackathons
    });

  } catch (error) {
    console.error("Error fetching hackathons:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}



export async function applyToHackathon(req, res) {
  try {
    const userId = req.user._id; // assume auth middleware sets req.user
    const { hackathonId } = req.params;

    if (!hackathonId) {
      return res.status(400).json({ message: "Hackathon ID is required" });
    }

    const hackathon = await Hackathon.findById(hackathonId);

    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    // Check if user already applied
    const alreadyApplied = hackathon.participants.some(
      (p) => p.user.toString() === userId.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied to this hackathon" });
    }

    // Add participant with accepted false
    hackathon.participants.push({ user: userId, accepted: false });
    await hackathon.save();

    return res.status(200).json({ message: "Applied to hackathon successfully" });
  } catch (error) {
    console.error("Error applying to hackathon:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
   
}


export async function acceptParticipant(req, res) {
  try {
    const { hackathonId, userId } = req.params;

    if (!hackathonId || !userId) {
      return res.status(400).json({ message: "Hackathon ID and User ID are required" });
    }

    const hackathon = await Hackathon.findById(hackathonId);

    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    // Only company that owns the hackathon can accept participants
    if (hackathon.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the company can accept participants" });
    }

    // Find participant
    const participant = hackathon.participants.find(p => p.user.toString() === userId);

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    participant.accepted = true; // mark as accepted
    await hackathon.save();
    // Create notification
   
  









// Now hackathon exists, safe to use
const notificationMessage = `You have been accepted to join "${hackathon.title}"!`;
// Save the notification
await Notification.create({
  user: userId,
  message: notificationMessage,
  isRead: false,
});


    return res.status(200).json({ message: "Participant accepted successfully" });
  } catch (error) {
    console.error("Error accepting participant:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .populate("hackathon", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
 

  

export const markNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications read:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};








export const checkAuth = (req, res) => {
  try {     
    res.status(200).json(
    req.user // or req.user._doc if using Mongoose     
    );
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


