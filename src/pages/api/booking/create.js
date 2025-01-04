// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Booking } from "@/models/bookingModel";

import db from "@/utils/db";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(400).json({ message: "Only POST requests are allowed" });
    }
    await db.connect();
    try {
        const booking = new Booking({
            dateOfBooking: req.body.dateOfBooking,
            timeOfBooking: req.body.timeOfBooking,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber
        });
        await booking.save();
        return res.status(201).json({
            message: "Booking created successfully",
            data: booking,
        });
    }
    catch (error) {
        return res.status(400).json({ message: `Error in creating blog: ${error}` });
    }
}
