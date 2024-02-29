import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LeftMenu from './components/LeftMenu';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesSelection from './pages/ServicesSelection';
import CustomBundles from './pages/CustomBundles';
import DimensioningIP from './pages/DimensioningIP';
import DimensioningOutput from './pages/DimensioningOutput';
import Project from './pages/Project';

import './App.css';

const App = () => {
  const pages = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
    { title:'Project', path:'/Project'},
    { title: 'ServicesSelection', path: '/ServicesSelection' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
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
            <Route path="/Project" element={<Project />} />            
            <Route path="/ServicesSelection" element={<ServicesSelection/>} />
            <Route path="/custombundles" element={<CustomBundles />} />
            <Route path="/dimensioningIP" element={<DimensioningIP />} />
            <Route path="/output" element={<DimensioningOutput />} />
          </Routes>
        </div>
      </div>
    </Router>
 </DndProvider>
  );
};

export default App;
