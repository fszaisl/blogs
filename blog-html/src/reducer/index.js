import { combineReducers } from 'redux';
import user from './common/user';
import { blog } from '../reducer/blog/reducer'

export default combineReducers({
    user,
    blog
});