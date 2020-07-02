import { createStore, applyMiddleware } from 'redux';
import redexThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducer';

const loggerMiddleware = createLogger();

const store = createStore(rootReducer, applyMiddleware(redexThunk, loggerMiddleware));

export default store;