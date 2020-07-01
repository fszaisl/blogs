import axios from 'axios';
import { UPDATE_USER_DATA } from '../../constant/common/actionTypes';

const loginUrl = '/api/user/login'

const updateUserData = (data) => {
    return {
        type: UPDATE_USER_DATA,
        payload: data
    }
}


const login = (data) => {
    return dispatch => {
        axios.post(loginUrl, data)
            .then(res => {
                return res.data
            })
            .then(res => {
                console.log(res)
                dispatch(updateUserData(res));
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export {
    login
}