// import React, { useState } from "react";
// import "./Stepper.css";
// import { TiTick } from "react-icons/ti";

// const Stepper = () => {
//   const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];
//   const [currentStep, setCurrentStep] = useState(1);
//   const [complete, setComplete] = useState(false);

//   const handleNext = () => {
//     if (currentStep === steps.length) {
//       setComplete(true);
//     } else {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//       setComplete(false); // Reset completion status when going back
//     }
//   };

//   return (
//     <>
//       <div className="step-container">
//         {steps.map((step, i) => (
//           <div
//             key={i}
//             className={`step-item ${currentStep === i + 1 ? "active" : ""} ${
//               i + 1 < currentStep || complete ? "complete" : ""
//             } `}
//           >
//             <div className="step">
//               {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
//             </div>
//             <p className="step-text">{step}</p>
//           </div>
//         ))}
//       </div>
//       {!complete && (
//         <div>
//           <button className="btn" onClick={handlePrevious} disabled={currentStep === 1}>
//             Previous
//           </button>
//           <button className="btn" onClick={handleNext}>
//             {currentStep === steps.length ? "Finish" : "Next"}
//           </button>
//         </div>
//       )}
//     </>
//   );
// };
// export default Stepper;

// Stepper.jsx
import React, { useState } from "react";
import "./Stepper.css";
import { TiTick } from "react-icons/ti";
import { useStepContext } from "../StepContext"; // Importing the context hook

const Stepper = () => {
  const steps = ["Project Details", "Bundles", "Dimensioning Input", "Dimensioning Output", "Testing", "Deployement"];
  const { currentStep, complete, handleNext, handlePrevious } = useStepContext(); // Using the context hook

  return (
    <>
      <div className="step-container">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 ? "active" : ""} ${
              i + 1 < currentStep || complete ? "complete" : ""
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="step-text">{step}</p>
          </div>
        ))}
      </div>
      {/* {!complete && (
        <div>
          <button className="btn" onClick={handlePrevious} disabled={currentStep === 1}>
            Previous
          </button>
          <button className="btn" onClick={handleNext}>
            {currentStep === steps.length ? "Finish" : "Next"}
          </button>
        </div>
      )} */}
    </>
  );
};
export default Stepper;

