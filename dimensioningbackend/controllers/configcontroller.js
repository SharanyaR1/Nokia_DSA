//take the token from the json in the exact same format
const servicesbundleconfig = (req, res) => {
    try {
      const data = require('../config/servicesBundle.json');
      res.json(data);
    } catch (error) {
      console.error('Error loading servicesBundle.json:', error);
      res.status(500).send('Error loading servicesBundle.json');
    }
  };


const servicescustom=(req,res)=>{
    try {
        const data = require('../config/dimensioning-services.services-dependency.json');
        res.json(data);
      } catch (error) {
        console.error('Error loading servicesBundle.json:', error);
        res.status(500).send('Error loading servicesBundle.json');
      }
}

const servicesoptionaldependency = (req, res) => {
  try {
      const services = req.body; // ["hSS_IMS","HLR_AUTH"]
      const data = require('../config/dimensioning-services.services-dependency.json');
      let optional = [];

      for (const service of data) {
          if (services.includes(service.dependency.mainService) && service.dependency.optionalService && !optional.includes(service.dependency.optionalService)) {
              optional = optional.concat(service.dependency.optionalService);
          }
      }

      res.json(optional);
  } catch (error) {
      console.error('Error loading servicesBundle.json:', error);
      res.status(500).send('Error loading servicesBundle.json');
  }
}

module.exports={servicesbundleconfig,servicescustom,servicesoptionaldependency}