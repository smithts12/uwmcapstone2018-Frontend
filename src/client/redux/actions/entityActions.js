import axios from 'axios';
import uuid from 'uuid';
import { serverURL, headers } from '../config';

export const actions = {
    ENTITY_CREATE: 'ENTITY_CREATE',
    ENTITY_FETCH: 'ENTITY_FETCH',
    ENTITY_UPDATE: 'ENTITY_UPDATE',
    ENTITY_DELETE: 'ENTITY_DELETE',
    ENTITY_ERROR: 'ENTITY_ERROR',
    ENTITY_FETCH_ERROR: 'ENTITY_FETCH_ERROR',
};

export const fetchEntities = (entityType, userID) => async dispatch => {
    try {
        const result = await axios.get(`${serverURL}/${entityType}/${userID}`, headers());
        dispatch({
            type: actions.ENTITY_FETCH,
            entityType,
            loadedEntities: result.data,
        });
    } catch (error) {
        error.message = `Error loading entities of type '${entityType}' through API`;
        dispatch({
            type: actions.ENTITY_FETCH_ERROR,
            entityType,
            error
        });
    }
};

// Creates entity skeleton in store but doesn't save to backend
export const createLocalEntity = entityType => ({
    type: actions.ENTITY_CREATE,
    entityType,
    newEntity: {
        _local: true,
        id: uuid.v4(),
    },
});

// Create entity in backend and use response to replace it in store
export const createEntity = (entityType, localEntityData, userID) => async dispatch => {
    const { _local, id, ...entityData } = localEntityData;
    try {
        const postBody = { entityData: { userID, ...entityData } };
        const result = await axios.post(`${serverURL}/${entityType}`, postBody, headers());
        dispatch({
            type: actions.ENTITY_CREATE,
            entityType,
            newEntity: result.data,
        });
    } catch (error) {
        error.message = `Error creating entity of type '${entityType}' through API`;
        dispatch({
            type: actions.ENTITY_ERROR,
            entityType,
            entityId: id,
            error
        });
    }
};

// Update entity in backend and use response to replace it in store
export const updateEntity = (entityType, entityData, userID) => async dispatch => {
    try {
        const postBody = { entityData: { userID, ...entityData } };
        await axios.put(`${serverURL}/${entityType}`, postBody, headers());
        dispatch({
            type: actions.ENTITY_UPDATE,
            entityType,
            updatedEntity: entityData
        });
    } catch (error) {
        error.message = `Error updating entity of type '${entityType}' through API`;
        dispatch({
            type: actions.ENTITY_ERROR,
            entityType,
            entityId: entityData.id,
            error
        });
    }
};

// Delete entity skeleton from store
export const deleteLocalEntity = (entityType, entityId) => ({
    type: actions.ENTITY_DELETE,
    entityType,
    entityId
});

// Delete entity in backend and use response to delete it in store
export const deleteEntity = (entityType, entityId) => async dispatch => {
    try {
        await axios.delete(`${serverURL}/${entityType}/${entityId}`, headers());
        dispatch({
            type: actions.ENTITY_DELETE,
            entityType,
            entityId
        });
    } catch (error) {
        error.message = `Error deleting entity of type '${entityType}' through API`;
        dispatch({
            type: actions.ENTITY_ERROR,
            entityType,
            entityId,
            error
        });
    }
};

// When no error is passed along reducer will interpret that as a request to clear.
export const clearErrorEntity = (entityType, entityId) => ({ type: actions.ENTITY_ERROR, entityType, entityId });
