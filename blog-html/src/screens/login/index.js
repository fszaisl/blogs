import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, Card, Row, Col, Spin, message } from 'antd';
import { login } from '../../actions/common/user'
import axios from 'axios';
const Item = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}

class Login extends Component {

    constructor(props) {
        super();
        this.state = {
            loading: false
        }
    }

    onFinishFailed = () => {

    }

    onFinish = values => {
        const { dispatch } = this.props;
        const { username, password, remember } = values;
        dispatch(login({ username, password }));
    }

    onFinishFailed = () => {

    }



    render() {
        const { loading } = this.state;
        return (
            <Card style={{ width: '600px', margin: '100px auto', padding: '34px 24px' }}>
                <Spin spinning={loading}>
                    <Form
                        // {...layout}
                        name='basic'
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        {...formItemLayout}
                    >

                        <Item
                            label='用户名' name='username'
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder='请输入用户名' autoComplete='off' />
                        </Item>

                        <Item
                            label='密码' name='password'
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder='请输入密码' autoComplete='off' />
                        </Item>

                        <Item
                            name='remember' valuePropName='checked' label=' ' colon={false}
                        >
                            <Checkbox>记住密码</Checkbox>
                        </Item>

                        <Row>
                            <Col span={16} offset={6}>
                                <Button type='primary' htmlType='submit'>登 录</Button>
                                <Button type='default' style={{ marginLeft: '16px' }} htmlType='submit'>注 册</Button>
                            </Col>
                        </Row>

                    </Form>
                </Spin>

            </Card>
        )
    }
}
const mapStateToProps = (state) => {
    const { user: { userName, realName } } = state;
    return {
        userName: realName, userId: userName
    }
}

export default connect(mapStateToProps)(Login);