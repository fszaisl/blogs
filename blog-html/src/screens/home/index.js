import React from 'react';
import { Layout } from 'antd';
import Haeder from '../layouts/header'
const {  Footer, Sider } = Layout;


function App() {
    return (
        <Layout style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
            <Haeder />
            
        </Layout>
    );
}

export default App;