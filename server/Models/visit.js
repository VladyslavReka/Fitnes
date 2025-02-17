import mongoose from "mongoose";
const Schema = mongoose.Schema;

const visitSchema = new Schema({
  training: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Training',
    required: true, // Відвідування має посилатися на тренування
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  trainingType: {
    type: String
  },
  result: {
    performance: {
      type: String, // "Виконав вправи без помилок"
    },
    feedback: {
      type: String, // "Потрібно покращити витривалість"
    },
    issues: {
      type: String // "Скарги на біль у плечі"
    }
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  }
});

export default mongoose.model('Visit', visitSchema);