import multer, { memoryStorage } from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req , file , cb) => {

     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

     if(allowedTypes.includes(file.mimeType)){
        cb(null , true)
     }else{
         cb(new Error('Only .jpeg, .jpg, .png, .webp image formats are allowed'), false);

     }
}

export const upload = multer({
    storage,
   
    limits:{
         fileSize: 5 * 1024 * 1024 // 5 MB
    }
})
