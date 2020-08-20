import React from 'react'
import Loadable from 'react-loadable';
import { Spin, notification } from 'antd';
import axios from 'axios';
import { ContextPath } from '../constants';

axios.defaults.baseURL = ContextPath;
// 添加请求拦截器
axios.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);
// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        // console.log(`interceptors`, response)
        return response.data;
    },
    error => {
        // 对响应错误做点什么
        // console.log(JSON.stringify(error,null,4))
        notification.error({
            message: error.message,
            // description:'This is the content of the notification.',
        })
        return Promise.reject(error);
    }
);

export const dynamicComponent = path => {
    // console.log(path)
    return Loadable({
        loader: () => {
            return import(`../screens${path}`)
                .then(component => {
                    return component
                })
                .catch(err => {
                    return import(`../screens/notfound`)
                });
        },
        loading() {
            return <Spin size='large' className='' >123</Spin>
        }
    });
}

export const checkLogin = () => {
    let username = '123'
    if (!username) {

    }
}
