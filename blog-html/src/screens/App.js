import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './header'

import Login from './login';
import LoginSuccess from './loginSuccess';
import NotFound from './404';
import Home from './home';
import Register from './register';
import 'antd/dist/antd.css';

const { Content, Footer } = Layout;


function App() {
	return (
		<Layout style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} >
			<Header />
			<Content style={{ position: 'relative', height: 'calc(100% - 100px)', overflow: 'auto' }} >
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/loginSuccess' component={LoginSuccess} />
					<Route path='/home' component={Home} />
					<Route path='/' component={NotFound} />
				</Switch>
			</Content>
			<Footer style={{ textAlign: 'center' }} >HEHEHE</Footer>
		</Layout>
	);
}

export default App;