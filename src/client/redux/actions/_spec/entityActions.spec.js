import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    actions,
    createEntity,
    updateEntity,
    deleteEntity,
    createLocalEntity,
    deleteLocalEntity,
    clearErrorEntity
} from '../entityActions';
import { serverURL } from '../../config';

describe('Entity Action Creators', () => {
    const mock = new MockAdapter(axios);
    const mockStore = configureMockStore([thunk]);
    let store;
    beforeEach(() => {
        mock.reset();
        store = mockStore();
    });

    describe('createEntity', () => {
        const entityData = { rating: 8 };
        const localEntityData = { _local: true, id: 1, ...entityData };

        it('should handle success', async () => {
            const responseEntityData = { id: 2, rating: 8 };
            mock.onPost(`${serverURL}/apples`, { entityData }).reply(200, responseEntityData);
            const expectedActions = [
                {
                    type: actions.ENTITY_CREATE,
                    entityType: 'apples',
                    newEntity: responseEntityData
                }
            ];
            await store.dispatch(createEntity('apples', localEntityData));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should handle failure', async () => {
            mock.onPost(`${serverURL}/apples`, { entityData }).reply(400, new Error());
            const expectedActions = [
                {
                    type: actions.ENTITY_ERROR,
                    entityType: 'apples',
                    entityId: 1,
                    error: new Error("Error creating entity of type 'apples' through API")
                }
            ];
            await store.dispatch(createEntity('apples', localEntityData));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('updateEntity', () => {
        const entityData = { id: 2, rating: 8 };
        it('should handle success', async () => {
            mock.onPut(`${serverURL}/apples`, { entityData }).reply(200);

            const expectedActions = [
                {
                    type: actions.ENTITY_UPDATE,
                    entityType: 'apples',
                    updatedEntity: entityData
                }
            ];
            await store.dispatch(updateEntity('apples', entityData));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should handle failure', async () => {
            mock.onPost(`${serverURL}/apples`, entityData).reply(400, new Error());

            const expectedActions = [
                {
                    type: actions.ENTITY_ERROR,
                    entityType: 'apples',
                    entityId: 2,
                    error: new Error("Error updating entity of type 'apples' through API")
                }
            ];
            await store.dispatch(updateEntity('apples', entityData));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('deleteEntity', () => {
        it('should handle success', async () => {
            mock.onDelete(`${serverURL}/apples/3`).reply(200);

            const expectedActions = [
                {
                    type: actions.ENTITY_DELETE,
                    entityType: 'apples',
                    entityId: 3
                }
            ];
            await store.dispatch(deleteEntity('apples', 3));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should handle failure', async () => {
            mock.onDelete(`${serverURL}/apples/3`).reply(400, new Error());
            const expectedActions = [
                {
                    type: actions.ENTITY_ERROR,
                    entityType: 'apples',
                    entityId: 3,
                    error: new Error("Error deleting entity of type 'apples' through API")
                }
            ];
            await store.dispatch(deleteEntity('apples', 3));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('createLocalEntity', () => {
        const entityData = { rating: 8 };
        it('should dispatch correct action', async () => {
            await store.dispatch(createLocalEntity('apples', entityData));
            expect(store.getActions()[0]).toMatchObject({
                type: actions.ENTITY_CREATE,
                entityType: 'apples',
                newEntity: {
                    _local: true,
                    id: expect.any(String),
                }
            });
        });
    });

    describe('deleteLocalEntity', () => {
        it('should dispatch correct action', async () => {
            const expectedActions = [
                {
                    type: actions.ENTITY_DELETE,
                    entityType: 'apples',
                    entityId: 3
                }
            ];
            await store.dispatch(deleteLocalEntity('apples', 3));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('clearErrorEntity', () => {
        it('should dispatch correct action', async () => {
            const expectedActions = [
                {
                    type: actions.ENTITY_ERROR,
                    entityType: 'cats',
                    entityId: 5
                }
            ];
            await store.dispatch(clearErrorEntity('cats', 5));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
