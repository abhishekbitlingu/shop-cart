import { RESTORE_INTROSCREEN_FLAG, RESTORE_TOKEN, SIGN_OUT } from './NavigationActionType';

export const setNavigatorRoutesForAlreadyVisitedUser = flag => {
    return {
        type: RESTORE_INTROSCREEN_FLAG,
        flag: flag
    }
}

export const setNavigatorRoutesForPreLoggedInUser = authToken => {
    return {
        type: RESTORE_TOKEN,
        authToken: authToken
    }
}

export const setNavigatorRoutesForLogOut = () => {
    console.log("setNavigatorRoutesForLogOut called")
    return {
        type: SIGN_OUT,
    }
}