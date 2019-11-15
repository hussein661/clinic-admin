import { types } from './types';

const INITIAL_STATE = {
	userDetails: {
        user:{},
        profileDetails:{},
        businesses:[],
        userActivity:[]
    },
    email:''
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
        case types.SET_USER_TO_TRACK:   
        return {
				...state,
				userDetails: action.payload,
            };
        case types.SET_ADMIN_LOGGED_IN:
          return {
            ...state,
            email:action.payload
          }
            
		default:
			return state;
	}
};

export default reducer
