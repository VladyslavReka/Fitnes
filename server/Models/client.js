import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    type: String
  },
  contactInfo: {
    type: String,
    unique: true
  },
  membershipType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership',
    required: true
  },
  trainings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Training',
  }],
  visits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visit' }]
});

export default mongoose.model('Client', clientSchema);