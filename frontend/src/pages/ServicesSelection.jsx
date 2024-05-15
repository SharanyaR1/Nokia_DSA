import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useStepContext } from "../StepContext"; // Importing the context hook
// import servicesBundle from "../config/servicesBundle.json"; // Importing the configuration file
import "./ServicesSelection.css";

const ServicesSelection = () => {
  const navigate = useNavigate();
  const { handleNext, handlePrevious } = useStepContext(); // Using the context hook

  const [selectedOption, setSelectedOption] = useState("");
  const [services, setServices] = useState([]);
  const [optionalServices, setOptionalServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicesBundle, setServicesBundle] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5009/api/config')
      .then(response => response.json())
      .then(data => setServicesBundle(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const bundleOptions = servicesBundle.map((config) => ({
    id: config.bundles,
    label: config.bundles,
    services: config.services,
    optionalServices: config.optionalService,
  }));

  // const handleOptionChange = (bundle) => {
  //   const selectedBundle = servicesBundle.find(
  //     (config) => config.bundles === bundle,
  //   );
  //   setServices(selectedBundle.services);
  //   setOptionalServices(selectedBundle.optionalService);
  //   setSelectedOption(bundle);
  //   setSelectedServices([]); // Reset selected services when bundle changes
  // };

  const handleOptionChange = (bundle) => {
  if (bundle === "custom") {
    // Handle custom bundle differently
    setSelectedOption("custom");
    setServices([]);
    setOptionalServices([]);
    setSelectedServices([]);
  } else {
    const selectedBundle = servicesBundle.find((config) => config.bundles === bundle);
    if (selectedBundle) {
      setServices(selectedBundle.services);
      setOptionalServices(selectedBundle.optionalService);
      setSelectedOption(bundle);
      setSelectedServices([]); // Reset selected services when bundle changes
    }
  }
};


  const handleCheckboxChange = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices((prevServices) =>
        prevServices.filter((s) => s !== service),
      );
    } else {
      setSelectedServices((prevServices) => [...prevServices, service]);
    }
  };

  const handleCustomBundle = () => {
    console.log("Custom Bundle button clicked");
    navigate("/custombundles");
  };

  const handleSubmit = () => {
    console.log("Submit button clicked");

    try {
      if (selectedOption === "custom") {
        handleCustomBundle();
      } else {
        navigate("/dimensioningIP", {
          state: {
            servicesArray: [...services, ...selectedServices].map((name, id) => ({
              id,
              name,
            })),
          },
        });
        handleNext();
      }
    } catch (error) {
      console.error("Error submitting selected services:", error);
    }
  };

  const handlePrev = () => {
    navigate("/Project");
    handlePrevious(); // Call handlePrevious from the stepper context
  };

  return (
    <div className="container">
      <div className="bundle-section">
        <h2>Select Bundle</h2>
        <div className="bundle-options">
          {/* Use map to generate radio buttons dynamically */}
          {bundleOptions.map((option) => (
            <div key={option.id}>
              <input
                type="radio"
                id={option.id}
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => handleOptionChange(option.id)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
          <div>
            <input
              type="radio"
              id="custom"
              value="custom"
              checked={selectedOption === "custom"}
              onChange={() => handleOptionChange("custom")}
            />
            <label htmlFor="custom">Custom Bundle</label>
          </div>
        </div>
      </div>

      <div className="bundle-section">
        <h2>Optional Services</h2>
        <div className="optional-services">
          {optionalServices.map((service, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`optional-service-checkbox-${index}`}
                value={service}
                checked={selectedServices.includes(service)}
                onChange={() => handleCheckboxChange(service)}
              />
              <label htmlFor={`optional-service-checkbox-${index}`}>
                {service}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bundle-buttons">
        <div className="bundle-normal-btns">
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="back-btn" onClick={handlePrev}>
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSelection;
