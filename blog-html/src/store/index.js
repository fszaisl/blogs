import { createStore, applyMiddleware } from 'redux';
import redexThunk from 'redux-thunk';
import rootReducer from '../reducer';

const store = createStore(rootReducer, applyMiddleware(redexThunk));

export default store;