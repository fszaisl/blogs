import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Divider, Layout, Row, Col } from 'antd';
import { Link, } from 'react-router-dom';
import { getUserInfo, logOut } from '../../../actions/common/user'
// import axios from 'axios';


import styles from './style.module.css'
const { Header } = Layout;

class Haeder extends Component {

    constructor(props) {
        super()
        this.state = {
            navList: [
                { title: '首页' },
                { title: '我的博客' },
                { title: '登录' },
                { title: '退出' },
            ]
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getUserInfo());
    }

    logOut = () => {
        const { dispatch } = this.props;
        dispatch(logOut({}, () => {
            dispatch(getUserInfo());
        }));
    }

    render() {
        const { userName } = this.props;
        return (< Header  >
            <Row>
                <Col span={4} style={{ fontSize: '26px', color: '#fff' }} >博客系统</Col>
                <Col span={20} style={{ textAlign: 'right' }}>
                    <Link className={styles.headerNav} to='/home' > 首页 </Link>
                    <Divider type='vertical' />
                    {
                        userName ? (
                            <Fragment>
                                <Link className={styles.headerNav} to='/myblog' > 我的博客 </Link>
                                <Divider type='vertical' />
                                <Link className={styles.headerNav} to='/newblog' > 新建博客 </Link>
                                <Divider type='vertical' />
                                <Link to='/newblog' className={styles.headerNav} > {`${userName}你好，欢迎登录博客系统`} </Link>
                                <Divider type='vertical' />
                                <Link to='/login' className={styles.headerNav} onClick={this.logOut} > 退出 </Link>
                            </Fragment >
                        ) : (
                                <Link to='/login' className={styles.headerNav} > 登录 </Link>
                            )
                    }
                </Col>
            </Row>
        </Header>)
    }
}

const mapStateToProps = (state) => {
    const { user: { userName, userId } } = state;
    return { userName, userId }
}

export default connect(mapStateToProps)(Haeder);