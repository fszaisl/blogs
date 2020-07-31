import { createStore, applyMiddleware } from 'redux';
import redexThunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

// const loggerMiddleware = createLogger();
// const store = createStore(rootReducer, applyMiddleware(redexThunk, loggerMiddleware));
const store = createStore(rootReducer, applyMiddleware(redexThunk));
export default store;