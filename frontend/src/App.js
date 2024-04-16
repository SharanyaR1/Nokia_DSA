// // App.jsx
// import React from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavigationBar from './components/NavigationBar';
// import LeftMenu from './components/LeftMenu';
// import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
// import ServicesSelection from './pages/ServicesSelection';
// import CustomBundles from './pages/CustomBundles';
// import DimensioningIP from './pages/DimensioningIP';
// import DimensioningOutput from './pages/DimensioningOutput';
// import Project from './pages/Project';
// import Production from './pages/Production';
// import { DarkModeProvider } from './DarkModeContext'; 
// import './App.css';

// const App = () => {
//   const pages = [
//     { title: 'Home', path: '/' },
//     { title: 'Project', path: '/Project' },
//     { title: 'ServicesSelection', path: '/ServicesSelection' },
//     { title: 'Production', path: '/Production' },
//     { title: 'Manage', path: '/contact' },
//     { title: 'Observe', path: '/about' },
//   ];

//   return (
//     <DarkModeProvider>
//       <DndProvider backend={HTML5Backend}>
//         <Router>
//           <div className="app">
//             <div className="header">
//               <NavigationBar />
//             </div>

//             <div className="content">
//               <LeftMenu pages={pages} />
//               <Routes>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/about" element={<AboutPage />} />
//                 <Route path="/contact" element={<ContactPage />} />
//                 <Route path="/Project" element={<Project />} />
//                 <Route path="/ServicesSelection" element={<ServicesSelection />} />
//                 <Route path="/custombundles" element={<CustomBundles />} />
//                 <Route path="/dimensioningIP" element={<DimensioningIP />} />
//                 <Route path="/output" element={<DimensioningOutput />} />
//                 <Route path="/Production" element={<Production />} />
//               </Routes>
//             </div>
//           </div>
//         </Router>
//       </DndProvider>
//     </DarkModeProvider>
//   );
// };

// export default App;

// App.js

// import React from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavigationBar from './components/NavigationBar';
// import LeftMenu from './components/LeftMenu';
// import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
// import ServicesSelection from './pages/ServicesSelection';
// import CustomBundles from './pages/CustomBundles';
// import DimensioningIP from './pages/DimensioningIP';
// import DimensioningOutput from './pages/DimensioningOutput';
// import Project from './pages/Project';
// import Production from './pages/Production';
// import { DarkModeProvider } from './DarkModeContext';
// import './App.css';
// import { StepProvider } from './StepContext'; // Importing the StepProvider

// const App = () => {
//   const pages = [
//     { title: 'Home', path: '/' },
//     { title: 'Project', path: '/Project' },
//     { title: 'ServicesSelection', path: '/ServicesSelection' },
//     { title: 'DimensioningIP', path: '/dimensioningIP' },
//     { title: 'DimensioningOP', path: '/output' },
//     { title: 'Production', path: '/Production' },
//     { title: 'Manage', path: '/contact' },
//     { title: 'Observe', path: '/about' },

//   ];

//   return (
//     <DarkModeProvider>
//       <DndProvider backend={HTML5Backend}>
//         <Router>
//           <StepProvider> {/* Wrap with StepProvider */}
//             <div className="app">
//               <div className="header">
//                 <NavigationBar />
//               </div>

//               <div className="content">
//                 <LeftMenu pages={pages} />
//                 <Routes>
//                   <Route path="/" element={<HomePage />} />
//                   <Route path="/about" element={<AboutPage />} />
//                   <Route path="/contact" element={<ContactPage />} />
//                   <Route path="/Project" element={<Project />} />
//                   <Route path="/ServicesSelection" element={<ServicesSelection />} />
//                   <Route path="/custombundles" element={<CustomBundles />} />
//                   <Route path="/dimensioningIP" element={<DimensioningIP />} />
//                   <Route path="/output" element={<DimensioningOutput />} />
//                   <Route path="/Production" element={<Production />} />
//                 </Routes>
//               </div>
//             </div>
//           </StepProvider>
//         </Router>
//       </DndProvider>
//     </DarkModeProvider>
//   );
// };

// export default App;
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
import Production from './pages/Production';
import { DarkModeProvider } from './DarkModeContext';
import './App.css';
import { StepProvider } from './StepContext';
import { WizardProvider } from './context/WizardContext'; // Importing the WizardProvider

const App = () => {
  const pages = [
    { title: 'Home', path: '/' },
    { title: 'Project', path: '/Project' },
    { title: 'ServicesSelection', path: '/ServicesSelection' },
    { title: 'DimensioningIP', path: '/dimensioningIP' },
    { title: 'DimensioningOP', path: '/output' },
    { title: 'Production', path: '/Production' },
    { title: 'Manage', path: '/contact' },
    { title: 'Observe', path: '/about' },
  ];

  return (
    <DarkModeProvider>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <WizardProvider> {/* Wrap with WizardProvider */}
          <StepProvider>
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
                  <Route path="/ServicesSelection" element={<ServicesSelection />} />
                  <Route path="/custombundles" element={<CustomBundles />} />
                  <Route path="/dimensioningIP" element={<DimensioningIP />} />
                  <Route path="/output" element={<DimensioningOutput />} />
                  <Route path="/Production" element={<Production />} />
                </Routes>
              </div>
            </div>
            </StepProvider>
          </WizardProvider>
        </Router>
      </DndProvider>
    </DarkModeProvider>
  );
};

export default App;
