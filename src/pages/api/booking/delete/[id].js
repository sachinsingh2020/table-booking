import { Booking } from "@/models/bookingModel";

import db from "@/utils/db";

export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        return res.status(400).json({ message: "Only DELETE requests are allowed" });
    }
    await db.connect();
    try {
        const booking = await Booking.findById(req.query.id);
        if (booking) {
            await Booking.findByIdAndDelete(booking._id);
            return res.status(200).json({
                message: "Booking deleted successfully",
            });
        } else {
            return res.status(404).json({ message: "Booking not found" });
        }
    }
    catch (error) {
        return res.status(400).json({ message: `Error in deleting booking: ${error}` });
    }
}