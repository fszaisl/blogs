import React, { Component } from 'react';
import { Layout, Row, Col, List } from 'antd';
import HeaderNav from '../header';

const { Header, Content, Sider, Footer } = Layout;



class Home extends Component {

    constructor(props) {
        super()
    }


    render() {
        return (<Layout>
            <List></List>
        </Layout>)
    }
}

export default Home;