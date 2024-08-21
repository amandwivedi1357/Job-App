import { applyMiddleware, compose, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk';
import { rootReducer } from '.';


const initialState = {};

const middleware = [thunk];
const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  rootReducer,
  initialState,
    composer(applyMiddleware(...middleware))
);

export default store;