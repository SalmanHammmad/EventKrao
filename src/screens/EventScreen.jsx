import React, { useState } from 'react';
import CreateEvent from '../components/event/createEvent.jsx';
import Events from '../components/event/events';
import ParentComponent from '../components/event/eventUpdatePage'; // For updating events
import './EventScreen.css';
import UpdateScreen from './UpdateScreen';
import SearchEvent from '../components/event/SearchEvent.jsx';

const EventManager = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null); // Track the selected event for updating
    const apiEndpoint = import.meta.env.VITE_API_URL;

    const handleRefresh = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const handleUpdateEvent = (event) => {
        setSelectedEvent(event); // Set the selected event when "Update" is clicked
    };

    const handleDeleteEvent = (eventId) => {
        fetch(`${apiEndpoint}/events/${eventId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) throw new Error('Delete failed');
                handleRefresh();
            })
            .catch((error) => console.error('Error deleting event:', error));
    };

    const handleUpdateSuccess = () => {
        setSelectedEvent(null); // Reset the selected event after a successful update
        handleRefresh();
    };

    return (
        <div className="event-manager-container">
            <h1 className="event-manager-header">Event Management</h1>

            {!selectedEvent ? ( // Conditionally render the events list, search, or UpdateScreen
                <>
                    <section className="event-manager-section">
                        <h2>Create Event</h2>
                        <CreateEvent onEventCreated={handleRefresh} />
                    </section>

                    <hr className="divider" />

                    {/* Add the SearchEvent component here */}
                    <section className="event-manager-section">
                        <SearchEvent onUpdateEvent={handleUpdateEvent} onDeleteEvent={handleDeleteEvent} />
                    </section>

                    <hr className="divider" />

                    <section className="event-manager-section">
                        <h2>Events List</h2>
                        <Events refreshKey={refreshKey} onUpdateEvent={handleUpdateEvent} />
                    </section>
                </>
            ) : (
                // Render UpdateScreen if an event is selected for update
                <UpdateScreen 
                    selectedEvent={selectedEvent}
                    apiEndpoint={apiEndpoint}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </div>
    );
};

export default EventManager;