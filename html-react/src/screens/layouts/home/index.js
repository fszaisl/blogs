import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter, Switch, Route } from 'react-router-dom';
import Haeder from '../header';
import LeftMenu from '../leftMenu';
import WorkSpace from '../workSpace';

const { Footer, Content } = Layout;

class HomePage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {

        }
    }


    addTab = () => {

    }

    removeTab = () => {
        
    }

    render() {

        return (<Layout style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
            <Haeder />
            <Layout>
                <LeftMenu />
                <Content>
                    <Layout style={{ height: '100%' }} >
                        <Content style={{ backgroundColor: '#fff', padding: '16px 8px' }} >
                            <Switch>
                                <Route path='/' render={(match = {}) => {
                                    console.log(match)
                                    return (<WorkSpace {...match}
                                        addTab={this.addTab}
                                        removeTab={this.removeTab}
                                    />);
                                }} />
                            </Switch>
                        </Content>
                        {/* <Footer>123</Footer> */}
                    </Layout>
                </Content>
            </Layout>
        </Layout >);
    }
}

export default withRouter(HomePage);