import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import srore from './store';
import { dynamicComponent } from './uitls/util'
import Login from './screens/login';
import Register from './screens/register';
import 'antd/dist/antd.css';
import './index.css';

const HomeComponent = dynamicComponent(`/layouts/home`);

ReactDOM.render(
	<Provider store={srore}>
		<BrowserRouter>
			{/* <React.StrictMode> */}
			<Switch>
				<Route path='/home' render={() => {
					return <HomeComponent data1='data1' data2='data2' />
				}} />
				<Route path='/independent' render={(match = {}) => {
					let pathName = match.location.pathname;
					let path = pathName.replace('/independent', '');
					console.log(path)
					const AsyncComponent = dynamicComponent(path);
					return <AsyncComponent data1='data1' data2='data2' />
				}} />
				<Route path='/register' component={Register} />
				<Route path='/' component={Login} />
			</Switch>
			{/* </React.StrictMode> */}
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
