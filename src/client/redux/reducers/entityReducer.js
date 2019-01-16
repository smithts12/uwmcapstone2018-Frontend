import { actions } from '../actions/entityActions';
import { get, omit } from 'lodash';

export const initialState = {
    certifications: { list: [] },
    companies: { list: [] },
    contacts: { list: [] },
    education: { list: [] },
    positions: { list: [] },
    projects: { list: [] },
};

export default (state = initialState, action) => {
    const { type, entityType } = action;

    switch (type) {
        case actions.ENTITY_FETCH: {
            const { loadedEntities } = action;
            return {
                ...state,
                [entityType]: {
                    list: loadedEntities || []
                },
            };
        }
        case actions.ENTITY_CREATE: {
            const { newEntity } = action;
            const prevList = get(state, [entityType, 'list'], []);
            return {
                ...state,
                [entityType]: {
                    ...state[entityType],
                    list: prevList.filter(entity => !entity._local).concat(newEntity),
                },
            };
        }
        case actions.ENTITY_UPDATE: {
            const { updatedEntity } = action;
            return {
                ...state,
                [entityType]: {
                    ...state[entityType],
                    list: state[entityType].list.map(entity => (entity.id === updatedEntity.id) ? updatedEntity : entity),
                },
            };
        }
        case actions.ENTITY_DELETE: {
            const { entityId } = action;
            return {
                ...state,
                [entityType]: {
                    ...state[entityType],
                    list: state[entityType].list.filter(entity => entity.id !== entityId),
                },
            };
        }
        case actions.ENTITY_ERROR: {
            // If passed an error then bind to entity. Otherwise clear entity of errors.
            const { entityId, error } = action;
            return {
                ...state,
                [entityType]: {
                    ...state[entityType],
                    list: state[entityType].list.map(entity => {
                        if (entity.id === entityId) {
                            if (error) {
                                return { ...entity, error };
                            } else {
                                return omit(entity, 'error');
                            }
                        }
                        return entity;
                    }),
                },
            };
        }
        case actions.ENTITY_FETCH_ERROR: {
            const { error } = action;
            return {
                ...state,
                [entityType]: {
                    ...state[entityType],
                    error,
                },
            };
        }
        default:
            return state;
    }
};
