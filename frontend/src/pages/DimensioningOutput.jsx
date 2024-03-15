import React, { useState, useEffect } from 'react';

const DimensioningOutput = () => {
  const [backendResponse, setBackendResponse] = useState(null);

  useEffect(() => {
    // Simulate sending a request to the backend
    const fetchData = async () => {
        try {
          console.log("Inside")
          const response = await fetch('http://localhost:4000/api/calculateddata');
          console.log("SUp")
          // Check if the response is not OK (status code 200)
          if (!response.ok) {
            console.log("Hey");
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setBackendResponse(data);
        } catch (error) {
            console.log("Heyy");
          console.error('Error fetching data:', error);
          // Optionally, handle errors here
        }
      };
      
    fetchData(); // Call the fetchData function when the component mounts
  }, []);

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
              <tr key={bundle}>
                <td>{bundle}</td>
                <td>{backendResponse[bundle]['Pod count required']}</td>
                <td>{backendResponse[bundle]['Pod CPU']}</td>
                <td>{backendResponse[bundle]['Pod RAM']}</td>
                <td>{backendResponse[bundle]['Total Pod CPU']}</td>
                <td>{backendResponse[bundle]['Total Pod RAM']}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <button>Dimensioning Signoff</button>
    </div>
  );
};

export default DimensioningOutput;