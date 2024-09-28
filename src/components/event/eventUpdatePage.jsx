import React, { useState, useEffect } from 'react';
import UpdateForm from '../updateForm';

const UpdateEventManager = () => {
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [events, setEvents] = useState([]);
    const apiURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${apiURL}/events`);
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [apiURL]);

    const handleUpdateSuccess = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) => (event._id === updatedEvent._id ? updatedEvent : event))
        );
        alert('Event updated successfully!');
    };

    const fields = [
        { name: 'title', label: 'Title' },
        { name: 'location', label: 'Location' },
        { name: 'description', label: 'Description' },
    ];

    return (
        <div>
            <h1>Manage Events</h1>

            <h2>Select Event to Update:</h2>
            <select
                value={selectedEventId || ''}
                onChange={(e) => setSelectedEventId(e.target.value)}
            >
                <option value="" disabled>
                    Select an event
                </option>
                {events.map((event) => (
                    <option key={event._id} value={event._id}>
                        {event.title}
                    </option>
                ))}
            </select>

            {selectedEventId ? (
                <div>
                    <h2>Update Event</h2>
                    <UpdateForm
                        entityId={selectedEventId}
                        entityType="events"
                        fields={fields}
                        apiEndpoint={apiURL}
                        onUpdateSuccess={handleUpdateSuccess}
                    />
                </div>
            ) : (
                <p>Please select an event to update.</p>
            )}
        </div>
    );
};

export default UpdateEventManager;
