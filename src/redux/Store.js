import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import NavigationReducer from './reducers/NavigationReducer';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import root from './Sagas'
import userReducer from './reducers/UserReducer'

const rootReducer = combineReducers({
  navigation: NavigationReducer,
  form: formReducer,
  customerRegistration: userReducer,
});

const sagaMiddleware = createSagaMiddleware()
const configureStore = (initialState) => {
  const middleware = [sagaMiddleware];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
  sagaMiddleware.run(root);
  return store;
}

export default configureStore;