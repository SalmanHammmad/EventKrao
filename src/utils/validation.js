export const validateForm = (values) => {
    let errors = {};
    if (!values.title) errors.title = 'Title is required';
    if (!values.description) errors.description = 'Description is required';
    if (!values.location) errors.location = 'Location is required';
    return errors;
};
