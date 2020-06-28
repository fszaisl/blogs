import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './home'

import Login from './login';
import NotFound from './404';
import Register from './register';

function App() {
  return (
    <Home></Home>
  );
}

export default App;
