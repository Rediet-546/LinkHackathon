import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  banner:{type:String},
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  githubLink: { 
    type: String, 
    required: true 
  }, 
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  hackthon: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Hackathon",
    required: true 
  }
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;
