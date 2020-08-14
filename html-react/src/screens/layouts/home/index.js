import React, { Component } from 'react';
import { Layout, Tabs } from 'antd';
import { Switch, Route, withRouter } from 'react-router-dom';
import Haeder from '../header';
import LeftMenu from '../leftMenu';
import { dynamicComponent } from '../../../uitls/util';

const { Footer, Content } = Layout;
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


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: initialPanes[0].key,
            panes: initialPanes,
        }
    }

    onChange = (data1, data2, data3) => {
        console.log(data1, data2, data3)
    }

    onEdit = (data1, data2, data3) => {
        console.log(data1, data2, data3)
    }

    componentDidUpdate() {
        console.log(this.props)
    }

    render() {
        const { activeKey, panes } = this.state;
        return (<Layout style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
            <Haeder />
            <Layout>
                <LeftMenu />
                <Content>
                    <Layout style={{ height: '100%' }} >
                        <Content style={{ backgroundColor: '#fff', padding: '16px 8px' }} >
                            <Tabs
                                type="editable-card"
                                onChange={this.onChange}
                                activeKey={activeKey}
                                onEdit={this.onEdit}
                            >
                                {panes.map(pane => (
                                    <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                        <Switch>
                                            <Route path='/' render={(match = {}) => {
                                                let pathName = match.location.pathname;
                                                let path = pathName.replace('/home', '');
                                                const AsyncComponent = dynamicComponent(path);
                                                return <AsyncComponent data1='data1' data2='data2' />
                                            }} />
                                        </Switch>
                                    </TabPane>
                                ))}
                            </Tabs>
                        </Content>
                        <Footer>123</Footer>
                    </Layout>
                </Content>
            </Layout>
        </Layout >);
    }
}

export default withRouter(HomePage);