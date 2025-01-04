import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { baseUrl } from '@/utils/baseUrl';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    // Fetch events and available slots from your server
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                // Example API call to get booked slots
                const response = await axios.get(`${baseUrl}api/booking/get-slots`);
                const bookedSlots = response.data;

                const formattedSlots = bookedSlots.map((slot) => ({
                    title: `Booked: ${slot.name}`,
                    start: new Date(slot.startTime),
                    end: new Date(slot.endTime),
                    resource: slot,
                }));

                setEvents(formattedSlots);

                // Assume a function to get available slots
                const available = await axios.get(`${baseUrl}api/booking/available-slots`);
                setAvailableSlots(available.data);
            } catch (error) {
                toast.error('Failed to fetch slots');
            }
        };

        fetchSlots();
    }, []);

    // Handle date click to select a date
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    // Handle slot booking
    const handleSlotSelect = (slot) => {
        // Logic to handle booking on selected slot
        toast.success('Booking confirmed!');
    };

    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                selectable
                onSelectSlot={handleDateSelect} // Allow date selection
                onSelectEvent={handleSlotSelect} // Handle slot select
                views={['month', 'week', 'day']}
            />

            {selectedDate && (
                <div className="selected-date">
                    <h3>Selected Date: {selectedDate.toLocaleDateString()}</h3>
                    {/* Render available time slots for the selected date */}
                    <ul>
                        {availableSlots
                            .filter((slot) => moment(slot.date).isSame(selectedDate, 'day'))
                            .map((slot) => (
                                <li key={slot.id}>
                                    <button
                                        onClick={() => handleSlotSelect(slot)}
                                        className="time-slot-button"
                                    >
                                        {slot.time}
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CalendarView;
