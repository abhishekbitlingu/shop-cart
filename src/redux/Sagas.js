import UserSaga from './sagas/UserSaga'
import { all } from 'redux-saga/effects'

export default function* root() {
  yield all ([
    UserSaga(),
  ])
}