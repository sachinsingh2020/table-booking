import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { baseUrl } from '@/utils/baseUrl';
import { useRouter } from 'next/router';


const All = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();


    useEffect(() => {
        const fetchAllBookings = async () => {
            try {
                const response = await axios.get(`${baseUrl}api/booking/get`);
                setBookings(response.data.data);
            } catch (err) {
                setError('Failed to fetch bookings.');
                toast.error('Failed to fetch bookings.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllBookings();
    }, []);

    return (
        <div
            className='min-h-screen'
        >
            <div className="mt-4 px-4">
                <button
                    onClick={() => router.push('/')}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
                >
                    Back to Home
                </button>
            </div>
            <div className=" bg-gray-800 text-white p-6">
                <h1 className="text-4xl font-bold mb-4">All Bookings</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : bookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bookings.map((booking, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-900 rounded-lg shadow-md"
                            >
                                <p><strong>Name:</strong> {booking.name}</p>
                                <p><strong>Phone:</strong> {booking.phoneNumber}</p>
                                <p><strong>Date:</strong> {new Date(booking.dateOfBooking).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {booking.timeOfBooking}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </div>

    );
};

export default All;
