import mongoose from "mongoose";
const Schema = mongoose.Schema;

const trainingSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String, // формат "HH:mm"
    required: true
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  trainingType: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false, // Показує, чи було завершено тренування
  },

});

export default mongoose.model('Training', trainingSchema);