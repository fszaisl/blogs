import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Card, Row, Col, Spin, message, Layout } from 'antd';
import { register } from '../../actions/common/user';
import Header from '../layouts/header';
const { Content } = Layout;

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


    onFinish = values => {
        const { dispatch, history } = this.props;
        const { username, password, realname } = values;
        this.setState(() => ({ loading: true }));
        console.log(username, password, realname)
        dispatch(register({ username, password, realname },
            (res) => {
                history.push({ pathname: '/home/login', state: { remove:'123' } });
            },
            errorMessage => {
                message.warning(errorMessage);
                this.setState(() => ({ loading: false }));
            }
        ));
    }

    componentDidMount() {

    }
    validatorRepeatPassword = (rule, value) => {
        const { formName } = this.state;
        const _form = this.refs[formName];
        let password = _form.getFieldValue('password');
        if (password !== value) {
            return Promise.reject(`确认密码与密码不一致！`)
        }
        return Promise.resolve()
    }


    render() {
        const { loading, formName } = this.state;

        return (<Layout style={{ height: '100%', width: '100%', position: 'absolute', left: 0, top: 0 }} >
            <Header />
            <Content>
                <div style={{ padding: '70px 0 40px 0', textAlign: 'center', fontSize: '40px' }}>欢迎注册博客账户</div>
                <Card style={{ width: '800px', margin: '0 auto', padding: '34px 24px' }}>
                    <Spin spinning={loading}>
                        <Form
                            {...formLayout}
                            name='basic'
                            onFinish={this.onFinish}
                            // onFinishFailed={this.onFinishFailed}
                            ref={formName}
                        >

                            <Item
                                label='用户名'
                                name='username'
                                rules={[
                                    { required: true, message: '请输入用户名1' },
                                    { pattern: /^\w{6,20}$/g, message: '用户名只能由6-20位英文、数字、下划线组成' },
                                ]}
                            >
                                <Input placeholder='请输入用户名' autoComplete='off' />
                            </Item>

                            <Item label='昵称' name='realname' rules={[{ required: true, message: '请输入用户名' }]} >
                                <Input placeholder='请输入用户名' autoComplete='off' />
                            </Item>

                            <Item label='密码' name='password' rules={[{ required: true, message: '请输入密码' }]}>
                                <Input.Password placeholder='请输入密码' autoComplete='off' />
                            </Item>

                            <Item
                                label='确认密码'
                                name='repeatPassword'
                                rules={[
                                    { required: true, message: '请输入密码' },
                                    { validator: this.validatorRepeatPassword.bind(this) }
                                ]}
                            >
                                <Input.Password placeholder='请输入密码' autoComplete='off' />
                            </Item>

                            <Row>
                                <Col span={16} offset={6}>
                                    <Button type='primary' htmlType='submit'>注 册</Button>
                                </Col>
                            </Row>

                        </Form>
                    </Spin>
                </Card>
            </Content>
        </Layout>);
    }
}


export default connect()(Login);