import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    dateOfBooking: {
        type: Date,
        required: true
    },
    timeOfBooking: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

export const Booking = mongoose.models.Booking || mongoose.model('Booking', schema);