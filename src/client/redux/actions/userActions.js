import axios from 'axios';
import { serverURL, headers } from '../config';
import { fetchEntities } from './entityActions';

export const actions = {
    USER_FETCH: 'USER_FETCH',
    USER_UPDATE: 'USER_UPDATE',
    USER_DELETE: 'USER_DELETE', // TODO
    USER_ERROR: 'USER_ERROR',
};
const serviceURL = `${serverURL}/user`;

export const fetchUser = () => async dispatch => {
    try {
        // Try to get the user data
        let result = await axios.get(serviceURL, headers());
        if (result && result.data === '') {
            // If it doesn't exist then make a call to create it
            result = await axios.post(serviceURL, null, headers());
        }
        const userData = result.data;
        dispatch({
            type: actions.USER_FETCH,
            userData
        });
        [
            'certifications',
            'companies',
            'contacts',
            'education',
            'positions',
            'projects'
        ].forEach(entityType => fetchEntities(entityType, userData.id)(dispatch));
    } catch (error) {
        error.message = `Error loading or creating profile information through API`;
        dispatch({
            type: actions.USER_ERROR,
            error
        });
    }
};

export const updateUser = userData => async dispatch => {
    try {
        delete userData['createdDate']; // This and the below line may be a backend issue,
        delete userData['updatedDate']; // this gets us by given time constraints
        await axios.put(serviceURL, { userID: userData.userID, userData }, headers());
        dispatch({
            type: actions.USER_UPDATE,
            updatedUserData: userData
        });
    } catch (error) {
        error.message = `Error updating profile information through API`;
        dispatch({
            type: actions.USER_ERROR,
            error
        });
    }
};

export const deleteUser = userData => async dispatch => {
    try {
        // TODO - need this to log them out of the app
        await axios.delete(serviceURL, { userData }, headers());
        dispatch({
            type: actions.USER_DELETE,
        });
    } catch (error) {
        error.message = `Error deleting user profile through API`;
        dispatch({
            type: actions.USER_ERROR,
            error
        });
    }
};

// When no error is passed along reducer will interpret that as a request to clear.
export const clearErrorUser = () => ({ type: actions.USER_ERROR });
