// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useDarkMode } from '../DarkModeContext'; // Update the path if needed

// const LeftMenu = ({ pages }) => {
//   const location = useLocation();
//   const { isDarkMode } = useDarkMode(); // Use the dark mode state

//   if (!pages || pages.length === 0) {
//     return null; // Render nothing if pages are not defined or empty
//   }

//   return (
//     <div className={`left-menu ${isDarkMode ? 'dark-mode' : ''}`}>
//       <ul>
//         {pages.map((page, index) => (
//           <li key={index} className={location.pathname === page.path ? 'active' : ''}>
//             <Link to={page.path}>{page.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LeftMenu;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useDarkMode } from '../DarkModeContext'; 
// import { useWizard } from '../context/WizardContext'; 

// const LeftMenu = ({ pages }) => {
//   const location = useLocation();
//   const { isDarkMode } = useDarkMode();
//   const { visiblePages } = useWizard(); 

//   if (!pages || pages.length === 0) {
//     return null; 
//   }

//   return (
//     <div className={`left-menu ${isDarkMode ? 'dark-mode' : ''}`}>
//       <ul>
//         {pages.map((page, index) => (
//           visiblePages.includes(page.title) && (
//             <li key={index} className={location.pathname === page.path ? 'active' : ''}>
//               <Link to={page.path}>{page.title}</Link>
//             </li>
//           )
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LeftMenu;


// LeftMenu.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../DarkModeContext'; 
import { useWizard } from '../context/WizardContext'; 

const LeftMenu = ({ pages }) => {
  const location = useLocation();
  const { isDarkMode } = useDarkMode();
  const { selectedPages } = useWizard(); 

  if (!pages || pages.length === 0) {
    return null; 
  }

  return (
    <div className={`left-menu ${isDarkMode ? 'dark-mode' : ''}`}>
      <ul>
        {pages.map((page, index) => (
          selectedPages.includes(page.title) && (
            <li key={index} className={location.pathname === page.path ? 'active' : ''}>
              <Link to={page.path}>{page.title}</Link>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default LeftMenu;
