import { combineReducers } from 'redux';
import userReducer from './userReducer';
import entityReducer from './entityReducer';

export default combineReducers({
    user: userReducer,
    data: entityReducer
});
