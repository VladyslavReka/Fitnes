import mongoose from "mongoose";
const Schema = mongoose.Schema;

const membershipSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // вказується в місяцях
    required: true
  },
  price: {
    type: Number,
    required: true
  },
});

export default mongoose.model('Membership', membershipSchema);