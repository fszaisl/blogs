import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button,Card, Row, Col, Spin, message } from 'antd';
import { register, getUserInfo } from '../../actions/common/user'
const Item = Form.Item;
const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}

class Register extends Component {

    constructor(props) {
        super();
        this.state = {
            loading: false
        }
    }

    onFinishFailed = () => {

    }

    onFinish = values => {
        const { dispatch, history } = this.props;
        const { username, password, realname } = values;
        this.setState(() => ({ loading: true }));
        dispatch(
            register({ username, password, realname },
                () => {
                    // this.setState(() => ({ loading: false }));
                    history.push('/home');
                    message.success('注册成功');
                    this.setState(() => ({ loading: false }));
                    dispatch(getUserInfo({}));
                },
                errorMessage => {
                    message.warning(errorMessage);
                    this.setState(() => ({ loading: false }));
                }
            )
        );
    }

    render() {
        const { loading } = this.state;

        return (
            <Card style={{ width: '600px', margin: '100px auto', padding: '34px 24px' }}>
                <Spin spinning={loading}>
                    <Form
                        {...formLayout}
                        name='basic'
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    // onFinishFailed={this.onFinishFailed}
                    >

                        <Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名' }]} >
                            <Input placeholder='请输入用户名' autoComplete='off' />
                        </Item>

                        <Item label='昵称' name='realname' rules={[{ required: true, message: '请输入用户名' }]} >
                            <Input placeholder='请输入用户名' autoComplete='off' />
                        </Item>

                        <Item label='密码' name='password' rules={[{ required: true, message: '请输入密码' }]}>
                            <Input.Password placeholder='请输入密码' autoComplete='off' />
                        </Item>

                        <Item label='确认密码' name='password2' rules={[
                            { required: true, message: '请输入密码' },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    let password = getFieldValue('password')
                                    console.log(rule, value, password)
                                    if (password !== value) {
                                        return Promise.reject('确认密码与密码不一样')
                                    }
                                    return Promise.resolve('');
                                }
                            })
                        ]}>
                            <Input.Password placeholder='请输入密码' autoComplete='off' />
                        </Item>

                        <Row>
                            <Col span={16} offset={6}>
                                <Button type='primary' htmlType='submit'>注册</Button>
                            </Col>
                        </Row>

                    </Form>
                </Spin>

            </Card>
        )
    }
}

export default connect()(Register);