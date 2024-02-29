const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Hashmap to store TPS for 1 pod for each service
const tpsMap = {
    'Ausf_ueAuth': 1000,
    'Ausf_niddau': 800,
    'Udm_uecm': 1200,
    'Udm_ueauth': 1000,
    'Udm_sidf': 2000,
    'Udm_sdm': 800,
    'EIR_deviceCheck': 3000,
    'Hss_ims': 1200,
    'HSS_lte': 1200,
    'Hss_auth': 2000,
    'Hlr_callp': 1200,
    'Hlr_auth': 2000,
    'HTTPLB': 20000,
    'DiameterLB': 10000,
    'SS7LB': 10000,
    'Reg_trigger': 12000,
    'Lawful Interception': 5000
};

// Hashmap to store dependencies for each service
const dependencyMap = {
    'Ausf_ueAuth': ['HTTPLB'],
    'Ausf_niddau': ['HTTPLB'],
    'Udm_uecm': ['HTTPLB', 'Reg_trigger'],
    'Udm_ueauth': ['HTTPLB'],
    'Udm_sidf': ['Lawful Interception'],
    'Udm_sdm': ['HTTPLB', 'Reg_trigger'],
    'EIR_deviceCheck': ['HTTPLB'],
    'Hss_ims': ['DiameterLB', 'Reg_trigger'],
    'HSS_lte': ['DiameterLB', 'Reg_trigger'],
    'Hss_auth': ['Reg_trigger', 'Lawful Interception'],
    'Hlr_callp': ['SS7LB', 'Reg_trigger'],
    'Hlr_auth': ['SS7LB', 'Lawful Interception'],
    'HTTPLB': [],
    'DiameterLB': [],
    'SS7LB': [],
    'Reg_trigger': [],
    'Lawful Interception': []
};

// Function to calculate the number of pods for a service and its dependencies
const calculatePods = (serviceName, tps) => {
    // Initialize pods count for the current service
    const podsCount = Math.ceil(tps / tpsMap[serviceName]);

    // Initialize an object to store pods count for service and dependencies
    const podsInfo = { [serviceName]: podsCount };

    // If the service has dependencies, set pods count for each dependency equal to main service
    if (dependencyMap[serviceName].length > 0) {
        
        dependencyMap[serviceName].forEach(dependentService => {
            // Set pods count for dependent service equal to main service
            podsInfo[dependentService] = podsCount;
        });
    }

    return podsInfo;
};

// Endpoint to calculate the number of pods for a service
app.post('/calculate-pods', (req, res) => {
    // Assuming the request body contains the service name and TPS
    const { serviceName, tps } = req.body;

    // Calculate the number of pods for the service and its dependencies
    const podsRequired = calculatePods(serviceName, tps);

    // Respond with the calculated number of pods
    res.json(podsRequired);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
