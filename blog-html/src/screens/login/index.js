import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
const Item = Form.Item;

class Login extends Component {

    constructor(props) {
        super();
    }

    onFinishFailed = () => {

    }

    onFinish = () => {

    }

    onFinishFailed = () => {

    }



    render() {
        return (
            <Form
                // {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Item>

                <Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Item>

                <Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Item>

                <Item >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Item>
            </Form>
        )
    }
}

export default Login;