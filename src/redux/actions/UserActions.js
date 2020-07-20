import * as UserActionTypes from './UserActionTypes'

export const signInUser = userCredentials => ({
  type: UserActionTypes.SIGN_IN_USER,
  payloadData: userCredentials,
})

export const signInUserSuccess = userDetails => ({
  type: UserActionTypes.SIGN_IN_USER_SUCCESS,
  payloadData: userDetails,
})

export const signInUserError = error => ({
  type: UserActionTypes.SIGN_IN_USER_ERROR,
  payloadData: error,
})

export const signUpUser = userDetails => ({
    type: UserActionTypes.SIGN_UP_USER,
    payloadData: userDetails,
  })
  
  export const signUpUserSuccess = userDetails => ({
    type: UserActionTypes.SIGN_UP_USER_SUCCESS,
    payloadData: userDetails,
  })
  
  export const signUpUserError = error => ({
    type: UserActionTypes.SIGN_UP_USER_ERROR,
    payloadData: error,
  })