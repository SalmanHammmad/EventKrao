import React, { useState } from 'react';
import './SearchEvent.css';
import DeleteButton2 from '../buttons/DeleteButton2';
import EditButton2 from '../buttons/EditButton2';
import SearchIcon from '@mui/icons-material/Search';

const SearchEvent = ({ onUpdateEvent, onDeleteEvent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiURL = import.meta.env.VITE_API_URL;

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiURL}/events?search=${searchQuery}`); // Send search query to backend
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setSearchResults(data); // Set results in the state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-event-container">
      <h2>Search Event</h2>
      <input
        type="text"
        placeholder="Search by name or ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((event) => (
            <li key={event._id} className="search-result-item">
              <p><strong>Title:</strong> {event.title}</p>
              <p><strong>ID:</strong> {event._id}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Start Date:</strong> {event.startDate}</p>
              <p><strong>End Date:</strong> {event.endDate}</p>
              <EditButton2 onClick={() => onUpdateEvent(event)} />
              <DeleteButton2 onClick={() => onDeleteEvent(event._id)} />
            </li>
          ))}
        </ul>
      )}

      {searchResults.length === 0 && !loading && !error && searchQuery && (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default SearchEvent;
