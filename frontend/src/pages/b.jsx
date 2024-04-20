import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStepContext } from "../StepContext"; // Importing the context hook
import "./ServicesSelection.css";

const ServicesSelection = () => {
const navigate = useNavigate();
const { handleNext, handlePrevious } = useStepContext(); // Using the context hook

const [selectedOption, setSelectedOption] = useState("");
const [selectedServices, setSelectedServices] = useState([]);
console.log("The newly selected optional services are");
console.log(selectedServices);

const bundleOptions = [
{ id: "volte", label: "Volte" },
{ id: "vonr", label: "VoNR" },
{ id: "full-network", label: "Full Network" },
{ id: "5g", label: "5G" },
];

const handleOptionChange = (e) => {
setSelectedOption(e.target.value);
switch (e.target.value) {
case "volte":
setSelectedServices(["Lawful Interception"]);
break;
case "vonr":
setSelectedServices([
"Lawful Interception",
"Ausf_niddau",
"EIR_deviceCheck",
]);
break;
case "full-network":
setSelectedServices([
"Lawful Interception",
"Ausf_niddau",
"EIR_deviceCheck",
]);
break;
case "5g":
setSelectedServices([
"Lawful Interception",
"Ausf_niddau",
"EIR_deviceCheck",
]);
break;
default:
setSelectedServices([]);
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
// Assuming successful submission, navigate to the DimensioningIP page
navigate("/dimensioningIP", {
state: {
servicesArray: selectedServices.map((name, id) => ({ id, name })),
},
});

// Call handleNext to proceed to the next step in the stepper
handleNext();
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
onChange={handleOptionChange}
/>
<label htmlFor={option.id}>{option.label}</label>
</div>
))}
</div>
</div>

<div className="bundle-section">
<h2>Select Optional Services</h2>
<div className="optional-services">
{/* You can map over your services options here or use a different approach */}
<div>
<input
type="checkbox"
id={`service-checkbox-lawful-interception`}
value="Lawful Interception"
checked={selectedServices.includes("Lawful Interception")}
onChange={() => handleCheckboxChange("Lawful Interception")}
/>
<label htmlFor={`service-checkbox-lawful-interception`}>
Lawful Interception
</label>
</div>
<div>
<input
type="checkbox"
id={`service-checkbox-Ausf_niddau`}
value="Ausf_niddau"
checked={selectedServices.includes("Ausf_niddau")}
onChange={() => handleCheckboxChange("Ausf_niddau")}
/>
<label htmlFor={`service-checkbox-Ausf_niddau`}>Ausf_niddau</label>
</div>


<div>
<input
type="checkbox"
id={`service-checkbox-EIR_deviceCheck`}
value="EIR_deviceCheck"
checked={selectedServices.includes("EIR_deviceCheck")}
onChange={() => handleCheckboxChange("EIR_deviceCheck")}
/>
<label htmlFor={`service-checkbox-EIR_deviceCheck`}>
EIR_deviceCheck
</label>
</div>
</div>
</div>

<div className="bundle-buttons">
<div className="bundle-normal-btns">
<button className="submit-btn" onClick={handleSubmit}>
Submit
</button>
<button className="back-btn" onClick={handlePrev}>
Back
</button>
</div>



<div className="divider_custom"></div>
<button className="custom-bundle-btn" onClick={handleCustomBundle}>
Custom Bundle
</button>
</div>
</div>
);
};

export default ServicesSelection;
