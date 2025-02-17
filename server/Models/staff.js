import mongoose from "mongoose";
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  contactInfo: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['trainer', 'manager'],
    required: true
  }
});

export default mongoose.model('Staff', staffSchema);