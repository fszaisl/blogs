import axios from 'axios';
import { UPDATE_USER_DATA } from '../../constant/common/actionTypes';
import { isFunction } from 'lodash-es';

const loginUrl = '/api/user/login'

const updateUserData = (data) => {
    return {
        type: UPDATE_USER_DATA,
        payload: data
    }
}


const login = (data, scb, ecb) => {
    return dispatch => {
        axios.post(loginUrl, data)
            .then(res => {
                return res.data || {}
            })
            .then(res => {
                if (res.hasError) {
                    if (isFunction(ecb)) {
                        ecb(res.message)
                    }
                    return
                }
                dispatch(updateUserData(res.data));
                if (isFunction(scb)) {
                    scb(res)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export {
    login
}