import entityReducer, { initialState } from '../entityReducer';
import { actions } from '../../actions/entityActions';

describe('Entity Reducer', () => {
    describe('default', () => {
        it('should return the initial state', () => {
            expect(entityReducer(undefined, {})).toEqual(initialState);
        });
    });
    describe('create', () => {
        it('should load entities into store at entityType root', () => {
            const loadedEntities = [{ id: 1 }, { id: 3 }];
            const state = {};
            const action = {
                type: actions.ENTITY_FETCH,
                entityType: 'apples',
                loadedEntities
            };
            const nextState = {
                apples: { list: loadedEntities },
            };
            expect(entityReducer(state, action)).toEqual(nextState);
        });
        it('should handle empty list of entities', () => {
            const state = {};
            const action = {
                type: actions.ENTITY_FETCH,
                entityType: 'apples'
            };
            const nextState = {
                apples: { list: [] },
            };
            expect(entityReducer(state, action)).toEqual(nextState);
        });
        it('should clear any error from entityType root on success', () => {
            const loadedEntities = [{ id: 1 }, { id: 3 }];
            const state = {
                'apples': { error: new Error('sad') }
            };
            const action = {
                type: actions.ENTITY_FETCH,
                entityType: 'apples',
                loadedEntities
            };
            const nextState = {
                apples: { list: loadedEntities },
            };
            expect(entityReducer(state, action)).toEqual(nextState);
        });
    });
    describe('create', () => {
        it('should append the entity to the array of its type', () => {
            const state = {
                apples: { list: [{ id: 1 }] },
                oranges: { list: [{ id: 1 }] }
            };
            const action = {
                type: actions.ENTITY_CREATE,
                entityType: 'apples',
                newEntity: { id: 3 }
            };
            const nextState = {
                apples: { list: [{ id: 1 }, { id: 3 }] },
                oranges: { list: [{ id: 1 }] }
            };
            expect(entityReducer(state, action)).toEqual(nextState);
        });
        it('should create an array of entityType if it doesnt exist', () => {
            const state = {
                oranges: { list: [{ id: 2 }] }
            };
            const action = {
                type: actions.ENTITY_CREATE,
                entityType: 'apples',
                newEntity: { id: 1 }
            };
            const nextState = {
                apples: { list: [{ id: 1 }] },
                oranges: { list: [{ id: 2 }] }
            };
            expect(entityReducer(state, action)).toEqual(nextState);
        });
    });
    describe('update', () => {
        it('should replace the entity based on its type and id', () => {
            const state = {
                people: { list: [{ id: 1 }, { id: 2 }, { id: 3 }] },
                robots: { list: [{ id: 1 }, { id: 2 }, { id: 3 }] },
            };
            const action = {
                type: actions.ENTITY_UPDATE,
                entityType: 'people',
                updatedEntity: { id: 2, name: 'Carl' }
            };
            const nextState = {
                people: { list: [{ id: 1 }, { id: 2, name: 'Carl' }, { id: 3 }] },
                robots: { list: [{ id: 1 }, { id: 2 }, { id: 3 }] },
            };
            expect(entityReducer(state, action)).toEqual(nextState);
        });
    });
    describe('delete', () => {
        it('should delete the entity based on its type and id', () => {
            const state = {
                apples: { list: [{ id: 1 }, { id: 2 }] },
                oranges: { list: [{ id: 1 }, { id: 2 }, { id: 3 }] }
            };
            const action = {
                type: actions.ENTITY_DELETE,
                entityType: 'oranges',
                entityId: 2
            };
            const nextState = {
                apples: { list: [{ id: 1 }, { id: 2 }] },
                oranges: { list: [{ id: 1 }, { id: 3 }] },
            };
            expect(entityReducer(state, action)).toEqual(nextState);
        });
    });
    describe('error', () => {
        it('should bind an error to entity based on type and id', () => {
            const error = new Error('everything broke');
            const state = {
                apples: { list: [{ id: 1 }, { id: 2 }] },
                oranges: { list: [{ id: 1 }, { id: 2 }] }
            };
            const action = {
                type: actions.ENTITY_ERROR,
                entityType: 'oranges',
                entityId: 1,
                error
            };
            const nextState = {
                apples: { list: [{ id: 1 }, { id: 2 }] },
                oranges: { list: [{ id: 1, error }, { id: 2 }] },
            };
            expect(entityReducer(state, action)).toEqual(nextState);
        });
        it('should clear an error from entity based on type and id', () => {
            const error = new Error('everything broke');
            const state = {
                apples: { list: [{ id: 1 }, { id: 2, error }] },
                oranges: { list: [{ id: 1 }, { id: 2 }] }
            };
            const action = {
                type: actions.ENTITY_ERROR,
                entityType: 'apples',
                entityId: 2,
            };
            const nextState = {
                apples: { list: [{ id: 1 }, { id: 2 }] },
                oranges: { list: [{ id: 1 }, { id: 2 }] },
            };
            expect(entityReducer(state, action)).toEqual(nextState);
        });
    });
    describe('fetch error', () => {
        it('should bind error to entityType root in store', () => {
            const error = new Error('everything broke');
            const state = {
                apples: { list: [{ id: 1 }] },
                oranges: { list: [{ id: 1 }] }
            };
            const action = {
                type: actions.ENTITY_FETCH_ERROR,
                entityType: 'oranges',
                error
            };
            const nextState = {
                apples: { list: [{ id: 1 }] },
                oranges: { error, list: [{ id: 1 }] },
            };
            expect(entityReducer(state, action)).toEqual(nextState);
        });
    });
});
