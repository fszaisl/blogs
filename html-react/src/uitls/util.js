import React from 'react'
import Loadable from 'react-loadable';
import { Spin } from 'antd';

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
