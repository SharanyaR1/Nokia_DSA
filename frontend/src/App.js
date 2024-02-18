import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LeftMenu from './components/LeftMenu';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NextPage from './pages/NextPage';
import './App.css';

const App = () => {
  const pages = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <Router>
      <div className="app">
        <div className="header">
          <NavigationBar />
        </div>

        <div className="content">
          <LeftMenu pages={pages} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/next" element={<NextPage />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
