import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { baseUrl } from '@/utils/baseUrl';

const Booking = () => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [bookedDates, setBookedDates] = useState([]);
    const [selectedDateSlots, setSelectedDateSlots] = useState([]);


    useEffect(() => {
        const fetchBookings = async () => {
            try {
                console.log({ baseUrl });
                const response = await axios.get(`${baseUrl}api/booking/get`);
                setBookedDates(response.data.data);
            } catch (err) {
                toast.error('Failed to fetch booked dates.');
            }
        };

        fetchBookings();
    }, []);

    const handleDateClick = (selectedDate) => {
        const localDateStr = selectedDate.toLocaleDateString('en-CA');
        const bookingsOnThisDate = bookedDates.filter((booking) => {
            const bookingLocalDateStr = new Date(booking.dateOfBooking).toLocaleDateString('en-CA');
            return bookingLocalDateStr === localDateStr;
        });

        setSelectedDateSlots(bookingsOnThisDate.map((booking) => booking.timeOfBooking));
        setDate(selectedDate);
    };

    const generateTimeSlots = () => {
        const slots = [];
        for (let i = 8; i <= 22; i++) {
            const hour = i % 12 === 0 ? 12 : i % 12;
            const ampm = i < 12 ? 'AM' : 'PM';
            slots.push(`${hour}:00 ${ampm}`);
        }
        return slots;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formattedDate = date.toLocaleDateString('en-CA');

            // Send data to the API
            await axios.post(`${baseUrl}api/booking/create`, {
                name,
                phoneNumber: contact,
                dateOfBooking: formattedDate,
                timeOfBooking: time
            });

            toast.success('Booking Successful!');

            // Redirect to the summary page with query parameters
            router.push({
                pathname: '/booking/summary',
                query: {
                    name,
                    contact,
                    date: formattedDate,
                    time,
                    guests,
                },
            });
        } catch (err) {
            toast.error('Failed to create booking. Please try again.');
            setError('Failed to create booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex flex-col bg-gray-800 text-white">
            {/* Back to Home Button */}
            <div className="mt-4 px-4">
                <button
                    onClick={() => router.push('/')}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
                >
                    Back to Home
                </button>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-center py-10 lg:space-x-4">
                {/* Scrollable Booking Form Section */}
                <div className="lg:w-2/3 w-full px-4 lg:overflow-y-scroll lg:h-screen">
                    <h1 className="text-4xl font-bold mb-6">Book a Table</h1>
                    <form onSubmit={handleSubmit} className="bg-gray-900 p-8 shadow-xl rounded-lg">
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <div className="mb-4">
                            <label htmlFor="name" className="text-lg">Your Name</label>
                            <input
                                id="name"
                                type="text"
                                className="text-black outline-none py-2 px-2 text-2xl rounded-sm w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="contact" className="text-lg">Phone Number</label>
                            <input
                                id="contact"
                                type="tel"
                                className="text-black outline-none py-2 px-2 text-2xl rounded-sm w-full"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="date" className="text-lg">Select Date</label>
                            <Calendar
                                onChange={handleDateClick}
                                value={date}
                                className="w-full text-black"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="time" className="text-lg">Select Time</label>
                            <select
                                id="time"
                                className="text-black outline-none py-2 px-2 text-2xl rounded-sm w-full"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            >
                                <option value="" disabled>Select Time</option>
                                {generateTimeSlots()
                                    .filter((slot) => !selectedDateSlots.includes(slot))
                                    .map((slot, index) => (
                                        <option key={index} value={slot}>{slot}</option>
                                    ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="guests" className="text-lg">Number of Guests</label>
                            <input
                                id="guests"
                                type="number"
                                min="1"
                                className="text-black outline-none py-2 px-2 text-2xl rounded-sm w-full"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            value={loading ? "Booking..." : "Confirm Booking"}
                            className="text-white bg-orange-500 hover:bg-orange-600 outline-none py-2 px-2 text-2xl rounded-sm w-full cursor-pointer"
                            disabled={loading}
                        />
                    </form>
                </div>

                {/* Fixed Booked Time Slots Section */}
                <div className="lg:w-1/3 w-full p-4 sticky top-10 self-start">
                    <h2 className="text-2xl font-bold mb-4">Booked Time Slots</h2>
                    {selectedDateSlots.length > 0 ? (
                        <ul className="bg-gray-900 p-4 rounded-lg shadow-xl">
                            {selectedDateSlots.map((slot, index) => (
                                <li key={index} className="mb-2">{slot}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No bookings for this date.</p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Booking;
