import React from 'react';
import { useDataFetcher } from '../../hooks/useDataFetcher';
import DeleteData from '../deleteData';
import EditButton from '../buttons/EditButton';
import './events.css'; 

const Events = ({ onUpdateEvent }) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const { data, loading, error, setData } = useDataFetcher(`${apiURL}/events`);

    const handleDelete = (id) => {
        setData((prevData) => prevData.filter((event) => event._id !== id));
    };

    return (
        <div className="events-container">
            {loading && <p>Loading data...</p>}
            {error && <p className="error-message">Error fetching data: {error}</p>}
            {data && data.length > 0 ? (
                <ol className="event-list">
                    {data.map((event) => (
                        <li key={event._id} className="event-item">
                            <div className="event-details">
                                <h3 className="event-title">{event.title}</h3>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>Description:</strong> {event.description}</p>
                                <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleString()}</p>
                                <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleString()}</p>
                                <p><strong>ID:</strong> {event._id}</p>
                            </div>
                            <EditButton onClick={() => onUpdateEvent(event)} />
                            <DeleteData route="events" Id={event._id} onDelete={handleDelete} />
                            <br />
                        </li>
                    ))}
                </ol>
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
};

export default Events;