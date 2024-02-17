// import React from 'react';

// const LeftMenu = ({ pages, onPageSelect }) => {
//   if (!pages || pages.length === 0) {
//     return null; // Render nothing if pages are not defined or empty
//   }

//   return (
//     <div className="left-menu">
//       <ul>
//         {pages.map((page, index) => (
//           <li key={index} onClick={() => onPageSelect(page)}>
//             {page.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LeftMenu;
// import React from 'react';

// const LeftMenu = ({ pages, onPageSelect }) => {
//   if (!pages || pages.length === 0) {
//     return null; // Render nothing if pages are not defined or empty
//   }

//   return (
//     <div className="left-menu">
//       <ul>
//         {pages.map((page, index) => (
//           <li key={index} onClick={() => onPageSelect(page)}>
//             {page.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LeftMenu;
import React from 'react';
import { Link } from 'react-router-dom';

const LeftMenu = ({ pages }) => {
  if (!pages || pages.length === 0) {
    return null; // Render nothing if pages are not defined or empty
  }

  return (
    <div className="left-menu">
      <ul>
        {pages.map((page, index) => (
          <li key={index}>
            <Link to={page.path}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftMenu;
