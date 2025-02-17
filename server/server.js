import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import './Middleware/membershipStatusUpdater.js'

import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import membershipRoutes from './routes/membershipRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import trainingRoutes from './routes/trainingRoutes.js';
import visitRoutes from './routes/visitRoutes.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// Встановлення маршрутів
app.use('/auth', authRoutes);
app.use('/client', clientRoutes);
app.use('/membership', membershipRoutes);
app.use('/staff', staffRoutes);
app.use('/training', trainingRoutes);
app.use('/visit', visitRoutes);

const PORT = process.env.PORT || 3002;
async function start(){
  try {
    await mongoose.connect(process.env.MONGO_URL)

    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  } catch (error) {
      console.log(error);
  }
}
start();

export default app;