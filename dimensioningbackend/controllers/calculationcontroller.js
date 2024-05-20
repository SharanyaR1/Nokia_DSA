//Here we are calculating the number of pods for a service and its dependencies
//Storing projectid , calculations in the database
// Function to calculate the number of pods for a service and its dependencies
// Hashmap to store TPS for 1 pod for each service
require('dotenv').config();
const data = require('../config/dimensioning-services.services-dependency.json');
const services=require('../config/dimensioning-services.services-req.json')
console.log(data);


// Initialize an empty dependency map
const dependencyMap = {};

// Iterate over each dependency object
data.forEach(dep => {
  // Extract the main service and its mandatory services
  const { mainService, mandatoryService } = dep.dependency;
  
  // Add the main service and its mandatory services to the dependency map
  dependencyMap[mainService] = mandatoryService;
});

console.log(dependencyMap);


const { MongoClient } = require('mongodb');

async function insertInput(collection, input) {
    try {
        const result = await collection.insertOne(input);
        console.log('Document inserted:', result.insertedId);
    } catch (error) {
        console.error('Error inserting document into MongoDB:', error);
    }
}
async function connectToMongoDB() {
    try {
            
        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log('Connected to MongoDB successfullyyy');
        return client.db('dimensioning-inputs').collection('dummy');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return null;
    }
}

const tpsMap = {};
const vCPUDictionary = {};
const ramDictionary = {};




// Iterate over each service object
services.forEach(service => {
  // Extract serviceName, TPS, vCPU, and RAM
  const { serviceName, TPS, vCPU, RAM } = service;
  
  // Add serviceName and its TPS to tpsMap
  tpsMap[serviceName] = TPS;
  
  // Add serviceName and its vCPU to vCPUDictionary
  vCPUDictionary[serviceName] = vCPU;
  
  // Add serviceName and its RAM to ramDictionary
  ramDictionary[serviceName] = RAM;
});

console.log(tpsMap);
console.log(vCPUDictionary);
console.log(ramDictionary);
// const tpjsMap = {
//     'Ausf_ueAuth': 1000,
//     'Ausf_niddau': 800,
//     'Udm_uecm': 1200,
//     'Udm_ueauth': 1000,
//     'Udm_sidf': 2000,
//     'Udm_sdm': 800,
//     'EIR_deviceCheck': 3000,
//     'Hss_ims': 1200,
//     'HSS_lte': 1200,
//     'Hss_auth': 2000,
//     'Hlr_callp': 1200,
//     'Hlr_auth': 2000,
//     'HTTPLB': 20000,
//     'DiameterLB': 10000,
//     'SS7LB': 10000,
//     'Reg_trigger': 12000,
//     'Lawful Interception': 5000
// };

// const vcCPUDictionary = {
//     'Ausf_ueAuth': 2,
//     'Ausf_niddau': 1,
//     'Udm_uecm': 2,
//     'Udm_ueauth': 2,
//     'Udm_sidf': 1,
//     'Udm_sdm': 2,
//     'EIR_deviceCheck': 2,
//     'Hss_ims': 2,
//     'HSS_lte': 2,
//     'Hss_auth': 1,
//     'Hlr_callp': 2,
//     'Hlr_auth': 1,
//     'HTTPLB': 4,
//     'DiameterLB': 4,
//     'SS7LB': 4,
//     'Reg_trigger': 1,
//     'Lawful Interception': 1
// };


// const rramDictionary = {
//     'Ausf_ueAuth': 8,
//     'Ausf_niddau': 4,
//     'Udm_uecm': 8,
//     'Udm_ueauth': 8,
//     'Udm_sidf': 4,
//     'Udm_sdm': 8,
//     'EIR_deviceCheck': 8,
//     'Hss_ims': 8,
//     'HSS_lte': 8,
//     'Hss_auth': 4,
//     'Hlr_callp': 8,
//     'Hlr_auth': 4,
//     'HTTPLB': 16,
//     'DiameterLB': 16,
//     'SS7LB': 16,
//     'Reg_trigger': 4,
//     'Lawful Interception': 4
// };


// Hashmap to store dependencies for each service

// const dependencyMap = {
//     'Ausf_ueAuth': ['HTTPLB'],
//     'Ausf_niddau': ['HTTPLB'],
//     'Udm_uecm': ['HTTPLB', 'Reg_trigger'],
//     'Udm_ueauth': ['HTTPLB','Udm_sidf'],
//     'Udm_sdm': ['HTTPLB', 'Reg_trigger'],
//     'Udm_sidf': [],
//     'EIR_deviceCheck': ['HTTPLB'],
//     'Hss_ims': ['DiameterLB','Hss_auth','Reg_trigger'],
//     'HSS_lte': ['DiameterLB','Hss_auth', 'Reg_trigger'],
//     'Hss_auth': [],
//     'Hlr_callp': ['SS7LB', 'Reg_trigger'],
//     'Hlr_auth': ['SS7LB'],
//     'HTTPLB': [],
//     'DiameterLB': [],
//     'SS7LB': [],
//     'Reg_trigger': [],
//     'Lawful Interception': []
// };


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

const calculatetotalpods = async (req, res) => { 
    console.log("Co")
    console.log("req")
    console.log(req.body)
    const dependencytpsmap = {};
    
    // Assuming the request body contains a dictionary of service names and TPS values
  // Assuming the request body contains a dictionary of service names and TPS values
let serviceData = req.body;

console.log("Actual servicedata")
console.log(serviceData);
//  Get the length of the serviceData
const length = Object.keys(serviceData).length;


// // Convert the hashmap into an array of key-value pairs
const entries = Object.entries(serviceData);

console.log("Entries")
console.log(entries)

// // Use slice on the array to extract a portion
const slicedEntries = entries.slice(0, length-1);
const project = entries.slice(length-1, length);

console.log("The project")
console.log(project)
// // Convert the sliced array back to an object
serviceData = Object.fromEntries(slicedEntries);
const projectId = Object.fromEntries(project);
console.log("projectid")
console.log(projectId);
console.log(serviceData);
console.log("hi")
console.log(serviceData);

    //last element index of the array
    //oth to last but one index for service Data
    const collection = await connectToMongoDB();

    if (!collection) {
        return res.status(500).json({ error: 'Failed to connect to MongoDB' });
    }
    console.log("serviceData")
    console.log(serviceData)

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


//Loop through each service in the dictionary to handle dependencies
//but the service may not have dependencies in case its an optional service so we need to check if the service has dependencies




for (const serviceName in serviceData) {
    if (serviceData.hasOwnProperty(serviceName)) {
        // Get the TPS for the current service
        const tps = serviceData[serviceName];
 

        // Get the dependencies for the current service
        const dependencies = dependencyMap[serviceName];
        
        
        console.log("depencies")
        console.log(dependencies);

    if (dependencies){
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
}


console.log(dependencytpsmap);


// Loop through the dependencytpsmap to calculate pods info for each dependency
 //if dependencytpsmap is not empty then we need to loop through it and do stuff with it
   if (dependencytpsmap){
    for (const dependency in dependencytpsmap) {
        if (dependencytpsmap.hasOwnProperty(dependency)) {
            // Get the TPS and calculate the number of pods required for the dependency
            const dependencyTps = dependencytpsmap[dependency]       

            // Calculate pods info for the dependency based on its TPS and count of pods
            const dependencyPods = calculatePods(dependency, dependencyTps);
            
            console.log(dependencyPods);
        
            // Store the dependency pods info
            podsInfo[dependency] = dependencyPods;
        }
    }
   }

    console.log("rpoje")
    console.log(projectId)
    const combinedHashMap = { ...podsInfo, ...projectId };
    console.log(combinedHashMap)

    await insertInput(collection, combinedHashMap);
    
    // Respond with the calculated number of pods for all services
    console.log("combinedHashMap")
    console.log(combinedHashMap)
    res.json(combinedHashMap);
};



module.exports = { calculatetotalpods };
