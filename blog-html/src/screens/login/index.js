import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, Card, Row, Col, Spin, message } from 'antd';
import { login } from '../../actions/common/user'
const Item = Form.Item;
const formLayout = {
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
        const { dispatch, history } = this.props;
        const { username, password, remember } = values;
        this.setState(() => ({ loading: true }));
        dispatch(
            login({ username, password },
                () => {
                    this.setState(() => ({ loading: false }));
                    history.push('/loginSuccess');
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

                        <Item label='密码' name='password' rules={[{ required: true, message: '请输入密码' }]}>
                            <Input.Password placeholder='请输入密码' autoComplete='off' />
                        </Item>

                        <Item name='remember' valuePropName='checked' label=' ' colon={false}>
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

export default connect()(Login);