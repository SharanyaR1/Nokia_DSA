import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStepContext } from "../StepContext"; // Import the context hook
import ServicesContext from '../context/ServicesContext';

const DimensioningOutput = () => {
  const [backendResponse, setBackendResponse] = useState(null);
  const [totalPodCPU, setTotalPodCPU] = useState(0);
  const [totalPodRAM, setTotalPodRAM] = useState(0);
  const { handleNext } = useStepContext(); // Using the context hook
  const { Services, setServices } = React.useContext(ServicesContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate sending a request to the backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4007/api/calculateddata');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        const servicesData = Object.keys(data).reduce((acc, bundle) => {
          acc[bundle] = data[bundle]['Pod count required'];
          return acc;
        }, {});

        setServices(servicesData);

        console.log('Services:');
        console.log(servicesData);

        setBackendResponse(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  useEffect(() => {
    // Calculate total sum of CPU and RAM when backendResponse changes
    if (backendResponse) {
      let totalCPU = 0;
      let totalRAM = 0;
      Object.values(backendResponse).forEach(bundle => {
        totalCPU += bundle['Total Pod CPU'];
        totalRAM += bundle['Total Pod RAM'];
      });
      setTotalPodCPU(totalCPU);
      setTotalPodRAM(totalRAM);
    }
  }, [backendResponse]);

  const handleDimensioningSignoff = () => {
    // Your logic for dimensioning signoff...
    // Navigate to the next step
    handleNext(); // Call handleNext from the stepper context
    navigate('/nextStep'); // Navigate to the next step route
    navigate('/Production');
  };
  const handlePrev = () => {
    navigate('/DimensioningIP');
     // Call handlePrevious from the stepper context
  };

  useEffect(()=>{

    console.log("Services")
    console.log(Services)
  
  },[Services])
  return (
    <div>
      <h3>Dimensioning Output</h3>
      <table>
        <thead>
          <tr>
            <th>Bundle</th>
            <th>Pod count required</th>
            <th>Pod CPU</th>
            <th>Pod RAM</th>
            <th>Total Pod CPU</th>
            <th>Total Pod RAM</th>
          </tr>
        </thead>
        <tbody>
          {backendResponse &&
            Object.keys(backendResponse).map((bundle) => (
              <tr key={bundle} style={{ backgroundColor: 'white', color: 'black' }}>
                <td >{bundle}</td>
                <td>{backendResponse[bundle]['Pod count required']}</td>
                <td>{backendResponse[bundle]['Pod CPU']}</td>
                <td>{backendResponse[bundle]['Pod RAM']}</td>
                <td>{backendResponse[bundle]['Total Pod CPU']}</td>
                <td>{backendResponse[bundle]['Total Pod RAM']}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr style={{ backgroundColor: 'white', color: 'black', fontWeight:'bold'}}>
            <td colSpan="4">Total:</td>
            <td>{totalPodCPU}</td>
            <td>{totalPodRAM}</td>
          </tr>
        </tfoot>
      </table>
      <br />
      <button onClick={handlePrev} style={{ width: '200px', height: '50px', fontSize: '18px' }} >Previous</button>
      <button onClick={handleDimensioningSignoff} style={{ width: '220px', height: '50px', fontSize: '18px' }} >Dimensioning Signoff</button>
    </div>
  );
};

export default DimensioningOutput;
