const bundleservices = (req, res) => {
    console.log(req.body);
    const { bundles } = req.body;
  
    // Mock data for demonstration
    const data = require("../config/dimensioning-services.services-bundle.json")
    console.log(data)
    
    // Filter the data based on the provided bundle name
    const filteredServices = data.filter(item => item.bundles === bundles);

    //find the dependent services for these services of a bundle
    const dependentServices = data.filter(item => item.bundles === bundles);
    
    
    // Extract service names from filtered services
    const serviceNames = filteredServices.map(service => service.services);
    
    // Join service names together with a comma
    const concatenatedServices = serviceNames.join(',');


    console.log(concatenatedServices);
    
    if (concatenatedServices) {
      res.status(200).json({ services: concatenatedServices });
    } else {
      res.status(404).json({ error: 'No services with optional service found' });
    }
};

module.exports = bundleservices;
