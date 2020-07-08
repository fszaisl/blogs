import { combineReducers } from 'redux';
import user from './common/user';
import { blog } from './blog/reducer'

export default combineReducers({
    user,
    blog
});