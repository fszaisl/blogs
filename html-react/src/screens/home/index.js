import React, { Component } from 'react';
import { Layout, Breadcrumb, Menu, Tabs } from 'antd';
import Haeder from '../layouts/header';
import LeftMenu from '../layouts/leftMenu';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

const initialPanes = [
    { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
    { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
    {
        title: 'Tab 3',
        content: 'Content of Tab 3',
        key: '3',
        closable: false,
    },
];


class HomePage extends Comment {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: initialPanes[0].key,
            panes: initialPanes,
        }
    }

    render() {
        const { activeKey, panes } = this.state;
        return (<Layout style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
            <Haeder />
            <Layout>
                <LeftMenu />
                <Content>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Tabs
                            type="editable-card"
                            onChange={this.onChange}
                            activeKey={activeKey}
                            onEdit={this.onEdit}
                        >
                            {panes.map(pane => (
                                <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                    {pane.content}
                                </TabPane>
                            ))}
                        </Tabs>
                        <Footer>123</Footer>
                    </Layout>
                </Content>
            </Layout>
        </Layout >);
    }
}

export default HomePage;