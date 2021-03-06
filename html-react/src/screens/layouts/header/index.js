import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Divider, Layout, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
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
                    <NavLink className={styles.headerNav} to={{ pathname: "/home/home", state: { title: '首页' } }} > 首页 </NavLink>
                    <Divider type='vertical' />
                    <NavLink className={styles.headerNav} to={{ pathname: "/home/myblog", state: { title: '我的博客' } }} > 我的博客 </NavLink>
                    <Divider type='vertical' />
                    <NavLink className={styles.headerNav} to={{ pathname: "/home/newblog", state: { title: '新建博客' } }} > 新建博客 </NavLink>
                    <Divider type='vertical' />
                    {
                        userName ? (
                            <Fragment>
                                <NavLink to='/home/newblog' className={styles.headerNav} > {`${userName}你好，欢迎登录博客系统`} </NavLink>
                                <Divider type='vertical' />
                                <NavLink to='/login' className={styles.headerNav} onClick={this.logOut} > 退出 </NavLink>
                            </Fragment >
                        ) : (
                                <NavLink to='/login' className={styles.headerNav} > 登录 </NavLink>
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