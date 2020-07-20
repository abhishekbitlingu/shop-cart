import { RESTORE_INTROSCREEN_FLAG, RESTORE_TOKEN, SIGN_OUT } from "./../actions/NavigationActionType";

const initialState = {
    hasVisitedIntro: false,
    isLoading: true,
    isSignout: false,
    userToken: null,
};

const NavigationReducer = (state = initialState, action) => {
    console.log("NavigationReducer called")
    switch (action.type) {
        case RESTORE_INTROSCREEN_FLAG:
            return {
                ...state,
                hasVisitedIntro: (action.flag != null && action.flag != 'undefined') ? true : false,
                isLoading: false,
            }
        case RESTORE_TOKEN:
            return {
                ...state,
                userToken: action.authToken,
                isLoading: false,
            };
        case SIGN_OUT:
            console.log("Sign out called")
            return {
                ...state,
                hasVisitedIntro: false,
                isSignout: true,
                userToken: null,
            };
        default:
            return state;
    }
}

export default NavigationReducer;