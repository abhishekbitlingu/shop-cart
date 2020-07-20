import * as UserActionTypes from "./../actions/UserActionTypes";

const initialState = {
    credentials: null,
    userData: null,
    isLoading: false,
    error: null,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_USER:
            console.log("UserReducer, SIGN_IN_USER Action")
            return {
                ...state,
                credentials: action.payloadData,
                userData: null,
                isLoading: true,
                error: null
            }
        case UserActionTypes.SIGN_IN_USER_SUCCESS:
            console.log("UserReducer, SIGN_IN_USER_SUCCESS Action")
            return {
                ...state,
                credentials: null,
                userData: action.payloadData,
                isLoading: false,
                error: null
            }
        case UserActionTypes.SIGN_IN_USER_ERROR:
            console.log("UserReducer, SIGN_IN_USER_ERROR Action")
            return {
                ...state,
                userData: null,
                credentials: null,
                error: action.payloadData,
                isLoading: false,
            }
        case UserActionTypes.SIGN_UP_USER:
            console.log("UserReducer, SIGN_UP_USER Action")
            return {
                ...state,
                credentials: null,
                userData: action.payloadData,
                error: null,
                isLoading: true,
            }
        case UserActionTypes.SIGN_UP_USER_SUCCESS:
            console.log("UserReducer, SIGN_UP_USER_SUCCESS Action")
            return {
                ...state,
                credentials: null,
                userData: action.payloadData,
                error: null,
                isLoading: false,
            }
        case UserActionTypes.SIGN_UP_USER_ERROR:
            console.log("UserReducer, SIGN_UP_USER_ERROR Action")
            return {
                ...state,
                credentials: null,
                userData: null,
                error: action.payloadData,
                isLoading: false,
            }
        default:
            return state;
    }
}

export default UserReducer;