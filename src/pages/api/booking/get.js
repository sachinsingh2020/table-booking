import { Booking } from "@/models/bookingModel";

import db from "@/utils/db";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(400).json({ message: "Only GET requests are allowed" });
    }
    await db.connect();
    try {
        const bookings = await Booking.find({});
        return res.status(200).json({
            message: "All bookings fetched successfully",
            data: bookings,
        });
    }
    catch (error) {
        return res.status(400).json({ message: `Error in fetching bookings: ${error}` });
    }
}

