import React from 'react';
import UpdateForm from '../components/updateForm';

const UpdateScreen = ({ selectedEvent, apiEndpoint, onUpdateSuccess }) => {
    return (
        <div>
            <h2>Update Event</h2>
            <UpdateForm
                entityId={selectedEvent._id}
                entityType="events"
                fields={[
                    { name: 'title', label: 'Title' },
                    { name: 'location', label: 'Location' },
                    { name: 'description', label: 'Description' },
                    { name: 'startDate', label: 'Start Date' },
                    { name: 'endDate', label: 'End Date' }
                ]}
                apiEndpoint={apiEndpoint}
                onUpdateSuccess={onUpdateSuccess}
            />
        </div>
    );
};

export default UpdateScreen;
