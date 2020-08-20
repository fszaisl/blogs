import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Card, Row, Col, Spin, message, Layout } from 'antd';
import { login, getUserInfo } from '../../actions/common/user';
import Header from '../layouts/header';
import { enCrypt, deCrypt } from '../../uitls/crypto';
const { Content, Footer } = Layout;

const Item = Form.Item;
const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}

class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            loading: false,
            formName: 'loginForm',
        }
        // this.form = Form.useForm();
    }

    onFinishFailed = () => {

    }

    getRememberPassword = () => {
        const { formName } = this.state;
        const _form = this.refs[formName];
        let { remember = false, username = '', password = '' } = localStorage;
        if (remember) {
            username = deCrypt(username);
            password = deCrypt(password);
            _form.setFieldsValue({ remember, username, password })
        }
    }

    setRememberPassword = (values) => {
        const { remember, username, password } = values;
        if (remember) {
            localStorage.setItem(`remember`, remember);
            localStorage.setItem(`username`, enCrypt(username));
            localStorage.setItem(`password`, enCrypt(password));
        } else {
            localStorage.removeItem('remember');
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }
    }

    onFinish = values => {
        const { dispatch, history } = this.props;
        const { username, password } = values;

        this.setState(() => ({ loading: true }));
        dispatch(
            login({ username, password },
                () => {
                    this.setRememberPassword(values);
                    history.push('/home/home');
                    message.success('登录成功');
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

    toRegister = (e) => {
        e.preventDefault();
        const { history } = this.props;
        history.push('/register');
    }

    componentDidMount() {
        this.getRememberPassword();
    }


    render() {
        const { loading, formName } = this.state;

        return (<Layout style={{ height: '100%', width: '100%', position: 'absolute', left: 0, top: 0 }} >
            <Header />
            <Content>
                <div style={{ padding: '70px 0 40px 0', textAlign: 'center', fontSize: '40px' }}>欢迎登陆博客系统</div>
                <Card style={{ width: '600px', margin: '0 auto', padding: '34px 24px' }}>
                    <Spin spinning={loading}>
                        <Form
                            {...formLayout}
                            name='basic'
                            initialValues={{ remember: false }}
                            onFinish={this.onFinish}
                            // onFinishFailed={this.onFinishFailed}
                            ref={formName}
                        >

                            <Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名' }]} >
                                <Input placeholder='请输入用户名' autoComplete='off' />
                            </Item>

                            <Item label='密码' name='password' rules={[{ required: true, message: '请输入密码' }]}>
                                <Input.Password placeholder='请输入密码' autoComplete='off' />
                            </Item>

                            <Item name='remember' valuePropName='checked' label=' ' colon={false}>
                                <Checkbox>记住密码</Checkbox>
                            </Item>

                            <Row>
                                <Col span={16} offset={6}>
                                    <Button type='primary' htmlType='submit'>登 录</Button>
                                    <Button type='default' style={{ marginLeft: '16px' }} onClick={this.toRegister} >注 册</Button>
                                </Col>
                            </Row>

                        </Form>
                    </Spin>
                </Card>
            </Content>
        </Layout>);
    }
}


export default connect()(withRouter(Login));