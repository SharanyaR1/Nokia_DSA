// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ServicesContext from '../context/ServicesContext';
// import './FinalServicesPage.css';

// const FinalServicesPage = () => {
//   const { selectedServices, setSelectedServices, services, optionalServices } = useContext(ServicesContext);
//   const navigate = useNavigate();

//   const handleServiceSelect = (service) => {
//     setSelectedServices((prevServices) => [...prevServices, service]);
//   };

//   const handlePrevious = () => {
//     navigate(-1);
//   };

//   const handleOptionalServiceSelect = (service, isChecked) => {
//     setSelectedServices((prevServices) => {
//       if (isChecked) {
//         return [...prevServices, service];
//       } else {
//         return prevServices.filter((s) => s !== service);
//       }
//     });
//   };

//   const handleSubmit = () => {
//     navigate('/dimensioningIP', {
//       state: {
//         servicesArray: [...services, ...selectedServices].map((name, id) => ({
//           id,
//           name,
//         })),
//       },
//     });
//   };

//   return (
//     <div className="container">
//       <div className="flex-container">
//         <div className="services-container">
//           <h3>Services</h3>
//           {services.map((service, index) => (
//             <button
//               key={index}
//               className="service-button"
//               onClick={() => handleServiceSelect(service)}
//             >
//               {service}
//             </button>
//           ))}
//         </div>
//         <div className="optional-services-container">
//           <h3>Optional Services</h3>
//           {optionalServices.map((service, index) => (
//             <div key={index} className="optional-service">
//               <input
//                 type="checkbox"
//                 name="optionalService"
//                 value={service}
//                 onChange={(e) => handleOptionalServiceSelect(service, e.target.checked)}
//               />
//               {service}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="buttons-container">
//         <button onClick={handlePrevious}>Previous</button>
//         <button onClick={handleSubmit}>Submit</button>
//       </div>
//     </div>
//   );
// };

// export default FinalServicesPage;


import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ServicesContext from '../context/ServicesContext';
import './FinalServicesPage.css';

const FinalServicesPage = () => {
  const { selectedServices, setSelectedServices, services, optionalServices } = useContext(ServicesContext);
  const navigate = useNavigate();

  const handleServiceSelect = (service) => {
    setSelectedServices((prevServices) => [...prevServices, service]);
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handleOptionalServiceSelect = (service, isChecked) => {
    setSelectedServices((prevServices) => {
      if (isChecked) {
        return [...prevServices, service];
      } else {
        return prevServices.filter((s) => s !== service);
      }
    });
  };

  const handleSubmit = () => {
    navigate('/dimensioningIP', {
      state: {
        servicesArray: [...services, ...selectedServices].map((name, id) => ({
          id,
          name,
        })),
      },
    });
  };

  return (
    <div className="final-services-container">
      <div className="flex-container">
        <div className="services-list-container">
          <h3>Services</h3>
          {services.map((service, index) => (
            <button
              key={index}
              className="service-button"
              onClick={() => handleServiceSelect(service)}
            >
              {service}
            </button>
          ))}
        </div>
        <div className="optional-services-list-container">
          <h3>Optional Services</h3>
          {optionalServices.map((service, index) => (
            <label key={index} className="optional-service-item">
              <input
                type="checkbox"
                name="optionalService"
                value={service}
                onChange={(e) => handleOptionalServiceSelect(service, e.target.checked)}
              />
              {service}
            </label>
          ))}
        </div>
      </div>
      <div className="buttons-container">
        <button className="action-button" onClick={handlePrevious}>Previous</button>
        <button className="action-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default FinalServicesPage;

