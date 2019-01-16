import userReducer from '../userReducer';
import { actions } from '../../actions/userActions';

const userData = { email: 'john@gmail.com' };

describe('User Reducer', () => {
    describe('default', () => {
        it('should return the initial state', () => {
            expect(userReducer(undefined, {})).toEqual({});
        });
    });
    describe('fetch', () => {
        it('should load user info into store', () => {
            const state = {};
            const action = {
                type: actions.USER_FETCH,
                userData,
            };
            const nextState = userData;
            expect(userReducer(state, action)).toEqual(nextState);
        });
        it('should clear any error from root on success', () => {
            const state = { error: new Error('sad') };
            const action = {
                type: actions.USER_FETCH,
                userData
            };
            const nextState = userData;
            expect(userReducer(state, action)).toEqual(nextState);
        });
    });
    describe('update', () => {
        it('should replace the user data in store', () => {
            const state = userData;
            const updatedUserData = { email: 'carl@yahoo.com' };
            const action = {
                type: actions.USER_UPDATE,
                updatedUserData
            };
            const nextState = updatedUserData;
            expect(userReducer(state, action)).toEqual(nextState);
        });
    });
    // TODO
    // describe('delete', () => {
    //     it('should remove all data from store and log the user out', () => {
    //     });
    // });
    describe('error', () => {
        it('should bind an error to root', () => {
            const error = new Error('everything broke');
            const state = userData;
            const action = {
                type: actions.USER_ERROR,
                error
            };
            const nextState = { ...userData, error };
            expect(userReducer(state, action)).toEqual(nextState);
        });
        it('should clear an error from root if no error passed', () => {
            const error = new Error('everything broke');
            const state = { ...userData, error };
            const action = { type: actions.USER_ERROR };
            const nextState = userData;
            expect(userReducer(state, action)).toEqual(nextState);
        });
    });
});
