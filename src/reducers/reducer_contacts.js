import { GET_CONTACTS, GET_CONTACT, DELETE_CONTACT, UPDATE_CONTACT } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
        case GET_CONTACTS:
            // Convert an array of objects (action.payload.data) into an object of objects who's keys match the value of
            // the property provided as the second argument (in this case 'id') and who's values match the objects within the original array of objects (action.payload.data)
            return _.mapKeys(action.payload.data, 'id');
        case GET_CONTACT:
            // Add a new key (action.payload.data.id) to the state, and provide it with action.payload.data as it's value.
            return { ...state, [action.payload.data.id]: action.payload.data };
        case DELETE_CONTACT:
            // If the state object has a key of action.payload (which in this case is the post's id), then drop that key.
            return _.omit(state, action.payload);
        case UPDATE_CONTACT:
            return { ...state, [action.payload.data.id]: action.payload.data };
        default:
            return state;
    }
}