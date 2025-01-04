import React from 'react';
import { useRouter } from 'next/router';

const Summary = () => {
    const router = useRouter();
    const { name, contact, date, time, guests } = router.query;

    if (!name || !contact || !date || !time || !guests) {
        return <div>Loading or Missing Data...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-10">
            <h1 className="text-3xl font-bold mb-6">Booking Summary</h1>

            <div className="bg-grey-500 p-6 shadow-lg rounded-lg w-full max-w-md">
                <p className="text-lg mb-2">Name: {name}</p>
                <p className="text-lg mb-2">Contact: {contact}</p>
                <p className="text-lg mb-2">Date: {new Date(date).toLocaleDateString()}</p>
                <p className="text-lg mb-2">Time: {time}</p>
                <p className="text-lg mb-2">Number of Guests: {guests}</p>
            </div>

            <div className="mt-4">
                <button
                    onClick={() => router.push('/')}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Summary;
