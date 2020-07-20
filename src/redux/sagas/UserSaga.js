import { SIGN_IN_USER, SIGN_UP_USER } from './../actions/UserActionTypes'
import { put, call, takeLatest } from 'redux-saga/effects'
import ApiHelper from '../../network/ApiHelper'
import * as UserActions from './../actions/UserActions'

function* signInUser(action) {
  console.log("Calling signInUser")
  try {
    const userDetails = yield call( ApiHelper.authenticateUser, action.payloadData)
    console.log("signInUser response" + JSON.stringify(userDetails))

    // this was done for mock json server
    // const userDetails = yield call([response, response.json])

    yield put(UserActions.signInUserSuccess(userDetails))

  } catch (e) {
    console.log(e)
    yield put(UserActions.signInUserError(e.toString()))
  }
}

function* signUpUser(action) {
  console.log("Calling signUpUser")
    try {
      const userDetails = yield call( ApiHelper.createUser, action.payloadData)
      console.log("signUpUser response" + JSON.stringify(userDetails))

      // this was done for mock json server
      // const userDetails = yield call([response, response.json])
      
      yield put(UserActions.signUpUserSuccess(userDetails))
    } catch (e) {
      console.error(e)
      yield put(UserActions.signUpUserError(e.toString()))
    }
  }

export default function* root() {
  console.log("root saga called")
  yield[
    yield takeLatest(SIGN_IN_USER, signInUser),
    yield takeLatest(SIGN_UP_USER, signUpUser)
  ]
  
}