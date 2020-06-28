import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import HeaderNav from '../headerNav';

const { Header, Content, Sider, Footer } = Layout;



class Home extends Component {


    render() {
        return (<Layout>
            <Header>
                <Row>
                    <Col span={4} style={{ fontSize: '26px', color: '#fff' }} >博客系统</Col>
                    <Col span={20}><HeaderNav /></Col>
                </Row>
            </Header>
            <Content>
                <Layout>
                    <Sider>123</Sider>
                    <Content>12312</Content>
                </Layout>
            </Content>

            <Footer></Footer>
        </Layout>)
    }
}

export default Home;