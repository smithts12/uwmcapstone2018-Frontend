import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    actions,
    fetchUser,
    updateUser,
    // deleteUser, // TODO
    clearErrorUser,
} from '../userActions';
import { serverURL } from '../../config';

describe('Entity Action Creators', () => {
    const mock = new MockAdapter(axios);
    const mockStore = configureMockStore([thunk]);
    const userData = { email: 'john@gmail.com' };
    let store;
    beforeEach(() => {
        mock.reset();
        store = mockStore();
    });

    describe('fetchUser', () => {
        it('should handle success if user existed', async () => {
            mock.onGet(`${serverURL}/user`).reply(200, userData);
            const expectedActions = [
                {
                    type: actions.USER_FETCH,
                    userData
                }
            ];
            await store.dispatch(fetchUser());
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should handle success if user didnt exist', async () => {
            mock.onGet(`${serverURL}/user`).reply(200, '');
            mock.onPost(`${serverURL}/user`).reply(200, userData);
            const expectedActions = [
                {
                    type: actions.USER_FETCH,
                    userData
                }
            ];
            await store.dispatch(fetchUser());
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should handle failure if user existed', async () => {
            mock.onGet(`${serverURL}/user`).reply(400);
            const expectedActions = [
                {
                    type: actions.USER_ERROR,
                    error: new Error('Error loading or creating profile information through API')
                }
            ];
            await store.dispatch(fetchUser());
            expect(store.getActions()).toEqual(expectedActions);
        });
        it('should handle failure if user didnt exist', async () => {
            mock.onGet(`${serverURL}/user`).reply(200, '');
            mock.onPost(`${serverURL}/user`).reply(400);
            const expectedActions = [
                {
                    type: actions.USER_ERROR,
                    error: new Error('Error loading or creating profile information through API')
                }
            ];
            await store.dispatch(fetchUser());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('updateUser', () => {
        it('should handle success', async () => {
            mock.onPut(`${serverURL}/user`, { userData }).reply(200);
            const expectedActions = [
                {
                    type: actions.USER_UPDATE,
                    updatedUserData: userData
                }
            ];
            await store.dispatch(updateUser(userData));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should handle failure', async () => {
            mock.onPut(`${serverURL}/user`, { userData }).reply(400);
            const expectedActions = [
                {
                    type: actions.USER_ERROR,
                    error: new Error('Error updating profile information through API')
                }
            ];
            await store.dispatch(updateUser(userData));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    // TODO
    // describe('deleteUser', () => {
    //     it('should handle success', async () => {
    //     });

    //     it('should handle failure', async () => {
    //     });
    // });

    describe('clearErrorUser', () => {
        it('should dispatch correct action', async () => {
            const expectedActions = [
                {
                    type: actions.USER_ERROR,
                }
            ];
            await store.dispatch(clearErrorUser());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
