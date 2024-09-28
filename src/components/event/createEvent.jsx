// src/components/event/CreateEvent.js
import React from 'react';
import { useFormHandler } from '../../hooks/useForm';
import { validateForm } from '../../utils/validation';

const CreateEvent = () => {
    const apiURL = import.meta.env.VITE_API_URL + '/events';
    const { values, handleChange, errors, handleSubmit, loading } = useFormHandler(
        { title: '', description: '', location: '' },
        validateForm,
        apiURL
    );

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    name="title"
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                />
                {errors.title && <p>{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <input
                    name="description"
                    type="text"
                    value={values.description}
                    onChange={handleChange}
                />
                {errors.description && <p>{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="location">Location</label>
                <input
                    name="location"
                    type="text"
                    value={values.location}
                    onChange={handleChange}
                />
                {errors.location && <p>{errors.location}</p>}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Create Event'}
            </button>
        </form>
    );
};

export default CreateEvent;
