import axios from 'axios';
import { UPDATE_USER_DATA } from '../../constants/common/actionTypes';
import { isFunction } from 'lodash-es';

const loginUrl = '/user/login'
const getUserInfoUrl = '/user/info'
const logOutUrl = '/user/logout'
const registerUrl = '/user/register'

const updateUserData = (data) => {
    return {
        type: UPDATE_USER_DATA,
        payload: data
    }
}


const login = (data = {}, scb, ecb) => {
    return dispatch => {
        axios.post(loginUrl, data)
            .then(res => {
                if (res.hasError) {
                    if (isFunction(ecb)) {
                        ecb(res.message)
                    }
                    return
                }
                if (isFunction(scb)) {
                    scb(res)
                }
            })
    }
}

const getUserInfo = (data = {}, scb, ecb) => {
    return dispatch => {
        axios.get(getUserInfoUrl, data)
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
    }
}

const logOut = (data = {}, scb, ecb) => {
    return dispatch => {
        axios.post(logOutUrl, data)
            .then(res => {
                if (res.hasError) {
                    if (isFunction(ecb)) {
                        ecb(res.message)
                    }
                    return
                }
                if (isFunction(scb)) {
                    scb(res)
                }
            })
    }
}

const register = (data = {}, scb, ecb) => {
    return dispatch => {
        axios.post(registerUrl, data)
            .then(res => {
                if (res.hasError) {
                    if (isFunction(ecb)) {
                        ecb(res.message)
                    }
                    return
                }
                if (isFunction(scb)) {
                    scb(res)
                }
            })
    }
}


export { login, getUserInfo, logOut, register }