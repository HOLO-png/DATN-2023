import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

export const initStore = (initialState = {}) => {
  return createStore(rootReducers, initialState, applyMiddleware(thunk));
};

const middleware = [thunk];
const makeStore = () =>
  createStore(rootReducers, compose(composeWithDevTools(applyMiddleware(...middleware))));
//const store = createStore(rootReducer, compose(applyMiddleware(...middleware)))
export const wrapper = createWrapper(makeStore);

