import React from 'react'
import Loadable from 'react-loadable';
import { Spin } from 'antd';

export const dynamicComponent = path => {
    // console.log(path)
    return Loadable({
        loader: () => {
            return import(`../screens${path}`)
                .then(component => {
                    // console.log('success')
                    return component
                })
                .catch(err => {
                    // console.log('error')
                    return import(`../screens/notfound`)
                });
        },
        loading() {
            // console.log('loading')
            return <Spin size='large' className='' >123</Spin>
        }
    });
}
