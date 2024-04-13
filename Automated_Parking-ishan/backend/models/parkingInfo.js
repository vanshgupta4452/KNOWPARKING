import mongoose from 'mongoose';

const parkingInfoSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  time: { type: Date, default: Date.now },
  parkingname: { type: String, required: true },
  parkingspot: { type: String, required: true } // Define parkingspot field
});

export const ParkingInfo = mongoose.model('ParkingInfo', parkingInfoSchema);
