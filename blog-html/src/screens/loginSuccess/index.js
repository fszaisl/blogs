import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Card, Row, Col, Result } from 'antd';
import 'antd/dist/antd.css';
const Item = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}

class LoginSuccess extends Component {

    constructor(props) {
        super();
        this.state = {
            loading: false
        }
    }

    onFinishFailed = () => {

    }

    onFinish = values => {
        const { username, password, remember } = values;
        console.log(values)
    }

    onFinishFailed = () => {

    }



    render() {
        const { loading } = this.state;
        return (
            <Result
                status='success'
                title='登录成功'
                subTitle='系统将在 3S 后为你调准到主页, 请稍后......'
                extra={[
                    <Button type='primary' key='console'>
                        立即跳转
                    </Button>
                ]}
            />
        )
    }
}

export default LoginSuccess;