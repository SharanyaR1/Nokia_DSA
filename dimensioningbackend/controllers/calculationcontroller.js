// Function to calculate the number of pods for a service and its dependencies
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
const vCPUDictionary = {
    'Ausf_ueAuth': 2,
    'Ausf_niddau': 1,
    'Udm_uecm': 2,
    'Udm_ueauth': 2,
    'Udm_sidf': 1,
    'Udm_sdm': 2,
    'EIR_deviceCheck': 2,
    'Hss_ims': 2,
    'HSS_lte': 2,
    'Hss_auth': 1,
    'Hlr_callp': 2,
    'Hlr_auth': 1,
    'HTTPLB': 4,
    'DiameterLB': 4,
    'SS7LB': 4,
    'Reg_trigger': 1,
    'Lawful Interception': 1
};


const ramDictionary = {
    'Ausf_ueAuth': 8,
    'Ausf_niddau': 4,
    'Udm_uecm': 8,
    'Udm_ueauth': 8,
    'Udm_sidf': 4,
    'Udm_sdm': 8,
    'EIR_deviceCheck': 8,
    'Hss_ims': 8,
    'HSS_lte': 8,
    'Hss_auth': 4,
    'Hlr_callp': 8,
    'Hlr_auth': 4,
    'HTTPLB': 16,
    'DiameterLB': 16,
    'SS7LB': 16,
    'Reg_trigger': 4,
    'Lawful Interception': 4
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
const calculatetotalpods = (req, res) => { 
    
    // Assuming the request body contains a dictionary of service names and TPS values
    const serviceData = req.body;

    // Object to store the result for each service
    const podsInfo = {};

    // Loop through each service in the dictionary
    for (const serviceName in serviceData) {
        if (serviceData.hasOwnProperty(serviceName)) {
            // Get the TPS for the current service
            const tps = serviceData[serviceName];

            // Calculate the number of pods for the current service and its dependencies
            const podsRequired = calculatePods(serviceName, tps);

            // Store the result for the current service
            podsInfo[serviceName] = podsRequired;
        }
    }

    // Calculate the sum of pods required for each service and its dependencies
    for (const serviceName in podsInfo) {
        if (podsInfo.hasOwnProperty(serviceName)) {
            let count = 0;
            let vcpu = 0;
            let ram = 0;

            // Add the pods required for the current service
            count += podsInfo[serviceName][serviceName];

            // Add the pods required for each dependency of the current service
            dependencyMap[serviceName].forEach(dependentService => {
                count += podsInfo[serviceName][dependentService];
            });


                    // Calculate vCPU and RAM for the current service
            vcpu += podsInfo[serviceName][serviceName] * vCPUDictionary[serviceName];
            ram += podsInfo[serviceName][serviceName] * ramDictionary[serviceName];

            // Add the total vCPU and RAM for dependent services
            dependencyMap[serviceName].forEach(dependentService => {
                vcpu += podsInfo[serviceName][dependentService] * vCPUDictionary[dependentService];
                ram += podsInfo[serviceName][dependentService] * ramDictionary[dependentService];
            });

            // Add the total count, vCPU, and RAM to the podsInfo object
            podsInfo[serviceName].count = count;
            podsInfo[serviceName].vcpu = vcpu;
            podsInfo[serviceName].ram = ram;
        }
    }

    // Respond with the calculated number of pods for all services
    res.json(podsInfo);
}

module.exports = { calculatetotalpods };