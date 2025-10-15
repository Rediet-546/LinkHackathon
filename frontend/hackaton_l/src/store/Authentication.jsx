import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';

import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import CreateProject from '../component/CreateProject';


export const Authentication = create((set , get ) => ({
    hackthonDetail:null,
    allHackathons:[],
    users:[],
    user:null,
    loadCurrentuser:false,
    currentUser:null,
    authUser:null,
    loadAlluser:false, 
    loadHackton:false,
    loadPosts:false,
    loadProject:false,
    campanyHacktons:[],
    allProject:[],
    currentUserProfile:[],
    loadProfile:false,
    posts:[],

   
    loadRegistration:false,
    
    register: async (formData) => {
        set({loadRegistration:true})
        try {
        const res = await axiosInstance.post('/api/user/register', formData);
       
        toast.success("User registered successfully")
        console.log(res.data.message);
        toast.success(res.data.message)
        } catch (error) {
          console.error('error.response', error.response?.data.message); 
          console.error('error.message:'+  error.message);          
          toast.error(error.response?.data.message)  
        }finally {
           set({ loadRegistration: false });
        }
    },

    createHackton: async (formData) => {
      set({loadRegistration:true})
      try {
           const res = await axiosInstance.post('/api/user/createHackton', formData);
       

           set((state) => ({
            campanyHacktons: [...state.campanyHacktons, res.data.hackathon]
          }));
           toast.success("Hackton Created Successfully")
       
      } catch (error) {
          console.error('error.response', error.response?.data.message); 
          console.error('error.message:'+  error.message);          
          toast.error(error.response?.data.message)  
        }finally {
           set({ loadRegistration: false });
        }
    },
    createPost: async (formData) => {
      console.log('post is reached ')
      set({loadPosts:true})
      try {
           const res = await axiosInstance.post('/api/post/createPost', formData);
           set((state) => ({
            post: [...state.post, res.data.post]
          }));
           toast.success("Posted Successfully")
       
      } catch (error) {
          console.error('error.response', error.response?.data.message); 
          console.error('error.message:'+  error.message);          
          toast.error(error.response?.data.message)  
        }finally {
           set({ loadPosts: false });
        }
    },


     getAllPosts: async () => {
      console.log('post is reached ')
      set({loadPosts:true})
      try {
           const res = await axiosInstance.get('/api/post/getAllPosts');
            set({post:res.data.posts})
           
       
      } catch (error) {
          console.error('error.response', error.response?.data.message); 
          console.error('error.message:'+  error.message);          
          toast.error(error.response?.data.message)  
        }finally {
           set({ loadPosts: false });
        }
    },


    createProject: async (formData) => {
      console.log('project is reached ')
      set({loadProject:true})
      try {
           const res = await axiosInstance.post('/api/project/createProject', formData
);
           
           set((state) => ({
            allProject: [...state.allProject, res.data.post]
          }));
           
           
           toast.success("Posted Successfully")
       
      } catch (error) {
          console.error('error.response', error.response?.data.message); 
          console.error('error.message:'+  error.message);          
          toast.error(error.response?.data.message)  
        }finally {
           set({ loadProject: false });
        }
    },

    getUserProjects: async () => {
      console.log('project is reached ')
      set({loadProject:true})
      try {
           const res = await axiosInstance.get('/api/project/getUserProjects',CreateProject);
            
           set({allProject:res.data.projects})
          
       
      } catch (error) {
          console.error('error.response', error.response?.data.message); 
          console.error('error.message:'+  error.message);          
          toast.error(error.response?.data.message)  
        }finally {
           set({ loadProject: false });
        }
    },
  

  //   getUserProfile: async (userId) => {
  //   set({ loadProfile: true });
  //   try {
  //     const { data } = await axios.get(`/api/user/getUserProfile/${userId}`);
  //     set({ currentUserProfile: data, loadProfile: false });
  //   } catch (error) {
  //     console.error("Error fetching user profile:", error);
  //     set({ loadProfile: false });
  //   }
  // },


  getUserProfile: async (userId) => {
    set({ loadProfile: true });
    try {
      const res  = await axiosInstance.get(`/api/user/getUserProfile/${userId}`);
      // Ensure we only set the payload, not the 'success' key
     
     
      set({ 
        currentUserProfile: {
          user: res.data.user || [] ,
          projects: res.data.projects || [],
          posts: res.data.posts || [],
          hackathons: res.data.hackathons || []
        },
        loadProfile: false 
      });

    console.log('USER PROFILE Hackthon:', res);  
    } catch (error) {
      console.error("Error fetching user profile:", error);
      set({ loadProfile: false, currentUserProfile: null });
    }
  },
    getHackthonByCampany: async () => {
     
      set({loadHackton:true})
      try {
           const res = await axiosInstance.get('/api/user/getHacktonByCampany');
           set({campanyHacktons:res.data.hackathons})
       
      } catch (error) {
          console.error('error.response', error.response?.data.message); 
          console.error('error.message:'+  error.message);          
          toast.error(error.response?.data.message)  
        }finally {
           set({ loadHackton: false });
        }
    },

    getHackthonById: async (hackathonId) => {
      console.log('get hackton by ID reached');
    if (!hackathonId) return;
    set({ loadHackton: true });
    try {
      const res = await axiosInstance.get(`/api/user/hackton/${hackathonId}`);
      set({ hackthonDetail: res.data.hackathon });
    } catch (error) {
      console.error('error.response', error.response?.data.message);
      console.error('error.message:' + error.message);
      toast.error(error.response?.data.message);
    } finally {
      set({ loadHackton: false });
    }
  },
   getAllHackathons: async () => {
    set({ loadHackathons: true });
    try {
      const res = await axiosInstance.get('/api/user/getAllHackathons'); // your backend endpoint
      set({ allHackathons: res.data.hackathons });
    } catch (error) {
      console.error('Error fetching hackathons:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Failed to fetch hackathons');
    } finally {
      set({ loadHackathons: false });
    }
  },
  
    
    login: async (formData) => {
       try{
         const res = await axiosInstance.post('/api/user/login' , formData)
         console.log("Login response:", res.data);
         toast.success(res.data.message || "Login successfull");
         set({authUser:res.data})
         console.log('=====>'+ res.data)
       
       }catch(error){
         toast.error(error.response?.data.message) 
         console.log('error while loggin' + error)
       }
    },


    applyToHackathon: async (hackathonId) => {
      console.log("Hackathon ID sent:", hackathonId);

    try {
      const res = await axiosInstance.post(`/api/user/hackton/apply/${hackathonId}`);
      toast.success(res.data.message);
      // Refresh hackathon detail after applying
      get().getHackthonById(hackathonId);
    } catch (err) {
      console.error(err);
      console.log(err.message)
      toast.error(err.response?.data.message || err.message);
    }
   },


    // frontend/src/store/Authentication.jsx
    acceptParticipant: async (hackathonId, userId) => {
      try {
        const res = await axiosInstance.post(`/api/user/hackathon/accept/${hackathonId}/${userId}`);
        toast.success(res.data.message);

        // Refresh hackathon detail
        get().getHackthonById(hackathonId);
      } catch (error) {
        console.error(error.response?.data.message || error.message);
        toast.error(error.response?.data.message || "Failed to accept participant");
      }
    },
notifications: [],
loadNotifications: false,

getNotifications: async () => {
  set({ loadNotifications: true });
  try {
    const res = await axiosInstance.get("/api/user/notifications");
    set({ notifications: res.data.notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
  } finally {
    set({ loadNotifications: false });
  }
},

markNotificationsRead: async () => {
  try {
    await axiosInstance.put("/api/user/notifications/read");
    set({ notifications: [] });
  } catch (error) {
    console.error("Error marking notifications read:", error);
  }
},


      //   getEmployee: async (employeeId) => {
      //   console.log('GET EMPLOYEE:', employeeId);
      //   try {
      //     const res = await axiosInstance.get(`/employee/getEmployeeById/${employeeId}`);
      //     set((state) => ({
      //       employees: { ...state.employees, [employeeId]: res.data.employee }
      //     }));
      //     console.log('EMPLOYEE STORED:', get().employees[employeeId]);
      //   } catch (err) {
      //     console.error('Error fetching employee', err);
      //   }
      // },
    getCurrentUser:async () => {

       
       set({loadCurrentEmployee:true})
       try{
         const res = await axiosInstance.get('/api/user/currentUser')
         set({currentUser:res.data})
        
         console.log('inside current user functioin' + res.data)
       
       }catch(error){
         console.log('error while fetching current user' + error)
       }finally{
         set({loadCurrentEmployee:false})
       }
    },

     
 

 



    
    PasswordResateRequest:(email) => {
      console.log('EMAIL' + email)
      try {
       const res =   axiosInstance.post('/employee/request-password-reset' , {email})
       console.log(res.data)
      //  set({resatePasswordRequestMessage:res.data.message})
      } catch (error) {
        console.log('error while sending password resate request' + error)
      }
    },
    changePassword:(navigate , token , formData) => {
      console.log('inside form data change password are: ' + formData)
      try {
        const res = axiosInstance.post(`/employee/reset-password/${token}` , formData)
         navigate("/login");
      } catch (error) {
        console.log('error while changing password ' + error)
      }
    }




}))