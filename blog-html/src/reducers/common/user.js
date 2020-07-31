import {
    UPDATE_USER_DATA
} from '../../constants/common/actionTypes';

const switchMap = {};
switchMap[UPDATE_USER_DATA] = (state, action) => {
    let { userName, userId } = action.payload;
    return Object.assign({}, state, { userName, userId });
}

let initUser = {
    userName: '',
    userId: ''
}

const User = (state = initUser, action) => {
    const { type } = action;
    if (switchMap[type]) {
        return switchMap[type](state, action);
    }
    return state
}

export default User;