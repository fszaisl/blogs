import { createStore, applyMiddleware } from 'redux';
import redexThunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from '../reducer';

// const loggerMiddleware = createLogger();

// const store = createStore(rootReducer, applyMiddleware(redexThunk));

export default () => {
    return createStore(rootReducer, applyMiddleware(redexThunk));
};