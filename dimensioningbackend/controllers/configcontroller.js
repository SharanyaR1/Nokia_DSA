//take the taken from the json in the exact same format
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


module.exports={servicesbundleconfig,servicescustom}