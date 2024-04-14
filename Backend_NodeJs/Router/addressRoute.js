const express = require('express');

const addressRouter = express.Router();

// Sample data store (replace this with a database in a real-world scenario)
const addresses = [];

addressRouter.post('/submit-address', (req, res) => {
    const address = req.body;
  
    // Basic validation: Check if required fields are present
    if (!address.street || !address.city || !address.state || !address.zip) {
      return res.status(400).json({ error: 'All address fields are required' });
    }
    
    addresses.push(address);
    res.json({ message: 'Address submitted successfully' });
  });
  

  module.exports=addressRouter