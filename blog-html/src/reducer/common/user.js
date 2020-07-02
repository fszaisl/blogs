import { merge, isEqual, isEmpty } from 'lodash-es';
import {
    UPDATE_USER_DATA
} from '../../constant/common/actionTypes';


const switchMap = {};
switchMap[UPDATE_USER_DATA] = (state, action) => {
    let { username, realname } = action.payload;
    return merge(state, { userName: username, realName: realname })
}

let initUser = {
    realName: '',
    userName: ''
}

const User = (state = initUser, action) => {
    const { type } = action;
    if (isEqual(type, UPDATE_USER_DATA) && switchMap[type]) {
        return switchMap[type](state, action);
    } else {
        return state
    }
}

export default User;