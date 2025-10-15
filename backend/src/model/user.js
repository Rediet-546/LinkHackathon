import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true
  },
   gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  }, 
  userType: { type: String, enum: ['user', 'company'], required: true },
  profilePicture: { type: String, default: '' },
  headline: { type: String, default: '' },
  about: { type: String, default: '' },
  website: { type: String, default: '' },
  location: { type: String, default: '' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;