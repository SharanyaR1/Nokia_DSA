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
    'Udm_ueauth': ['HTTPLB','Udm_sidf'],
    'Udm_sdm': ['HTTPLB', 'Reg_trigger'],
    'Udm_sidf': [],
    'EIR_deviceCheck': ['HTTPLB'],
    'Hss_ims': ['DiameterLB','Hss_auth','Reg_trigger'],
    'HSS_lte': ['DiameterLB','Hss_auth', 'Reg_trigger'],
    'Hss_auth': [],
    'Hlr_callp': ['SS7LB', 'Reg_trigger'],
    'Hlr_auth': ['SS7LB'],
    'HTTPLB': [],
    'DiameterLB': [],
    'SS7LB': [],
    'Reg_trigger': [],
    'Lawful Interception': []
};


const calculatePods = (serviceName, tps) => {
    console.log("hi")
    console.log(serviceName)
    console.log(tps)
    console.log(tpsMap[serviceName])
    // Initialize pods count for the current service
    const podsCount = Math.ceil(tps / tpsMap[serviceName]);

    console.log(podsCount);

    // Initialize vCPU and RAM for the current service
    const vcpu = podsCount * vCPUDictionary[serviceName];
    const ram = podsCount * ramDictionary[serviceName];
    
    // Return an object with pod count, vCPU, and RAM for the current service
    return {
        'Pod count required': podsCount,
        'Pod CPU': vCPUDictionary[serviceName],
        'Pod RAM': ramDictionary[serviceName],
        'Total Pod CPU': vcpu,
        'Total Pod RAM': ram
    };
};

const calculatetotalpods = (req, res) => { 

    const dependencytpsmap = {};
    
    // Assuming the request body contains a dictionary of service names and TPS values
    const serviceData = req.body;

    // Object to store the result for each service
    const podsInfo = {};

    // Loop through each service in the dictionary
    for (const serviceName in serviceData) {
        if (serviceData.hasOwnProperty(serviceName)) {
            // Get the TPS for the current service
            const tps = serviceData[serviceName];

            // Calculate the number of pods for the current service
            const podsRequired = calculatePods(serviceName, tps);

            // Store the result for the current service
            podsInfo[serviceName] = podsRequired;
        }
    }


// Loop through each service in the dictionary to handle dependencies
for (const serviceName in serviceData) {
    if (serviceData.hasOwnProperty(serviceName)) {
        // Get the TPS for the current service
        const tps = serviceData[serviceName];

        // Get the dependencies for the current service
        const dependencies = dependencyMap[serviceName];
    
        for (const dependency of dependencies) {
            console.log(dependency);
        
            // Check if the dependency is not in the dependencytpsmap
            if (!(dependency in dependencytpsmap)) {
                console.log(dependencytpsmap);
                dependencytpsmap[dependency] = parseInt(tps);
            } else {
                dependencytpsmap[dependency] += parseInt(tps);
            }
        }
        
    }
}

console.log(dependencytpsmap);

// Loop through the dependencytpsmap to calculate pods info for each dependency
for (const dependency in dependencytpsmap) {
    if (dependencytpsmap.hasOwnProperty(dependency)) {
        // Get the TPS and calculate the number of pods required for the dependency
        const dependencyTps = dependencytpsmap[dependency]
        const countOfPods = Math.ceil(dependencyTps / tpsMap[dependency]);

       

        // Calculate pods info for the dependency based on its TPS and count of pods
        const dependencyPods = calculatePods(dependency, dependencyTps);
        
        console.log(dependencyPods);
      
        // Store the dependency pods info
        podsInfo[dependency] = dependencyPods;
    }
}



    // Respond with the calculated number of pods for all services
    res.json(podsInfo);
};

module.exports = { calculatetotalpods };
