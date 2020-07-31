import axios from 'axios';
import { UPDATE_USER_DATA } from '../../constants/common/actionTypes';
import { isFunction } from 'lodash-es';

const loginUrl = '/api/user/login'
const getUserInfoUrl = '/api/user/info'
const logOutUrl = '/api/user/logout'
const registerUrl = '/api/user/register'

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
                return res.data || {}
            })
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
            .catch(error => {
                console.log(error)
            })
    }
}

const getUserInfo = (data = {}, scb, ecb) => {
    return dispatch => {
        axios.get(getUserInfoUrl, data)
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

const logOut = (data = {}, scb, ecb) => {
    return dispatch => {
        axios.post(logOutUrl, data)
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
                if (isFunction(scb)) {
                    scb(res)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const register = (data = {}, scb, ecb) => {
    return dispatch => {
        axios.post(registerUrl, data)
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
                if (isFunction(scb)) {
                    scb(res)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}


export { login, getUserInfo, logOut, register }