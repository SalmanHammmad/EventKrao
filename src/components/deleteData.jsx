import React from 'react';
import DeleteButton from './buttons/DeleteButton';

const DeleteData = ({ route, Id, onDelete }) => {
    const apiURL = import.meta.env.VITE_API_URL;
    
    const handleDelete = async () => {
        try {
            const response = await fetch(`${apiURL}/${route}/${Id}`, {
                method: 'DELETE',
            });

            // Check if the response status indicates success
            if (!response.ok) {
                // If not, read the error message
                const errorMessage = await response.text(); // Get error message from response
                throw new Error(`Failed to delete: ${errorMessage}`);
            }

           
            onDelete(Id);
            console.log(`Item with ID ${Id} deleted successfully.`);
        } catch (error) {
            console.error('Error:', error); // Log the error for debugging
            alert('Delete failed: ' + error.message); // Show alert for delete failure
        }
    };

    return (
        <DeleteButton onDelete={handleDelete} />
    );
};

export default DeleteData;
