import logo from './logo.svg';
import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Playlists from './components/Playlists';
import Login from './components/Login'

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/playlists'>Playlists</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/playlists' element={<Playlists/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
