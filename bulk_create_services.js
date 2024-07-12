const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

const API_TOKEN = 'YOUR_API_TOKEN'; // Replace with your actual API token
const CSV_FILE_PATH = 'path/to/services.csv'; // Replace with the actual path to your CSV file

// Function to create a service using PagerDuty API
async function createService(serviceData) {
  const url = 'https://api.pagerduty.com/services';

  const config = {
    headers: {
      'Authorization': `Token token=${API_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.pagerduty+json;version=2'
    }
  };

  const data = {
    service: {
      name: serviceData.name,
      escalation_policy: {
        id: serviceData.escalation_policy_id,
        type: 'escalation_policy_reference'
      }
    }
  };

  try {
    const response = await axios.post(url, data, config);
    console.log(`Service created: ${response.data.service.id}`);
  } catch (error) {
    console.error(`Error creating service: ${error.response.data}`);
  }
}

// Function to read CSV and create services
function processCSVAndCreateServices() {
  const services = [];

  fs.createReadStream(CSV_FILE_PATH)
    .pipe(csv())
    .on('data', (row) => {
      services.push(row);
    })
    .on('end', () => {
      services.forEach(service => {
        createService(service);
      });
    });
}

processCSVAndCreateServices();
