/* External packages */
import axios from 'axios';

/* Constants */
export const GET_CONTACT = 'GET_CONTACT';
export const GET_CONTACTS = 'GET_CONTACTS';
export const CREATE_CONTACT = 'CREATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';

const ROOT_URL = 'http://localhost:3000';

/* Action Creators */ 

// Fetch all contacts
export function getContacts() {
    const request = axios.get(`${ROOT_URL}/contacts`);
    return {
        type: GET_CONTACTS,
        payload: request
    };
}

// Create a new contact
export function createContact(values, callback) {
    const request = axios.post(`${ROOT_URL}/contacts`, values)
        .then( (response) => callback(response));
    return {
        type: CREATE_CONTACT,
        payload: request
    };  
}

// Get a specific contact
export function getContact(id) {
    const request = axios.get(`${ROOT_URL}/contacts/${id}`);
    return {
        type: GET_CONTACT,
        payload: request
    };
}

// Update a specific contact
export function updateContact(id, values, callback) {
    const request = axios.put(`${ROOT_URL}/contacts/${id}`, values)
        // Because we are tapping into .then here, we want to make sure we return something,
        // otherwise the reducers will not see anything within the payload of the action
        .then( (response) => {
            callback();
            return response;
        });
    return {
        type: UPDATE_CONTACT,
        payload: request
    };
}

// Delete a specific contact
export function deleteContact(id, callback) {
    const request = axios.delete(`${ROOT_URL}/contacts/${id}`)
        .then( () => callback());
    return {
        type: DELETE_CONTACT,
        payload: id
    };
}
