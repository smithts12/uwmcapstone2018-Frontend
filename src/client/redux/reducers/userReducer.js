import { actions } from '../actions/userActions';
import { omit } from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case actions.USER_FETCH: {
            return action.userData;
        }
        case actions.USER_UPDATE: {
            return action.updatedUserData;
        }
        case actions.USER_DELETE: {
            // TODO
            return state;
        }
        case actions.USER_ERROR: {
            // If passed an error then bind to root, otherwise clear error
            const { error } = action;
            return error ? { ...state, error } : omit(state, ['error']);
        }
        default:
            return state;
    }
};
