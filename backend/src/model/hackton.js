import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      accepted: { type: Boolean, default: false }
    }
  ],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
}, { timestamps: true });

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

export default Hackathon;
