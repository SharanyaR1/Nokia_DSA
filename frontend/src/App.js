// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavigationBar from './components/NavigationBar';
// import LeftMenu from './components/LeftMenu';
// import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
// import './App.css';

// const App = () => {
//   const [currentPage, setCurrentPage] = useState(null);

//   const onPageSelect = (page) => {
// //     setCurrentPage(page); // Update the current page state
// //     // You can perform additional actions here based on the selected page
// //     console.log('Selected page:', page);
// //   };

// //   const pages = [
// //     { title: 'Home', path: '/' },
// //     { title: 'About', path: '/about' },
// //     { title: 'Contact', path: '/contact' },
// //   ];

// //   return (
// //     <Router>
// //       <div className="app">
// //         <div className="header">
// //           <NavigationBar />
// //         </div>

// //         <div className="content">
// //           <LeftMenu pages={pages} onPageSelect={onPageSelect} />
// //           <Routes>
// //             <Route path="/" element={<HomePage />} />
// //             <Route path="/about" element={<AboutPage />} />
// //             <Route path="/contact" element={<ContactPage />} />
// //           </Routes>
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // };

// // export default App;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavigationBar from './components/NavigationBar';
// import LeftMenu from './components/LeftMenu';
// import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
// import './App.css';

// const App = () => {
//   const [currentPage, setCurrentPage] = useState(null);

//   const onPageSelect = (page) => {
//     setCurrentPage(page.component); // Update the current page component
//   };

//   const pages = [
//     { title: 'Home', component: <HomePage /> },
//     { title: 'About', component: <AboutPage /> },
//     { title: 'Contact', component: <ContactPage /> },
//   ];

//   return (
//     <Router>
//       <div className="app">
//         <div className="header">
//           <NavigationBar />
//         </div>

//         <div className="content">
//           <LeftMenu pages={pages} onPageSelect={onPageSelect} />
//           <div className="page-content">{currentPage}</div>
//         </div>
//       </div>


//     </Router>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LeftMenu from './components/LeftMenu';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
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
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
