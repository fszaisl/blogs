import React, { Component } from 'react';
import { Button, Result } from 'antd';

class LoginSuccess extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.goHome();
        }, 3000)
    }

    goHome = () => {
        this.props.history.push('/home');
    }

    render() {
        return (
            <Result
                status='success'
                title='登录成功'
                subTitle='系统将在 3S 后为你调准到主页, 请稍后......'
                extra={[
                    <Button type='primary' key='console' onClick={this.goHome}>
                        立即跳转
                    </Button>
                ]}
            />
        )
    }
}

export default LoginSuccess;