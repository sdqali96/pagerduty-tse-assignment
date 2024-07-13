const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

const API_TOKEN = 'e+N3dsPa8W5Cx4q1Fd2w'; // Replace with your actual API token
const CSV_FILE_PATH = '/Users/sali/Downloads/services.csv'; // Replace with the actual path to your CSV file

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
      description: serviceData.description,
      escalation_policy: {
        id: serviceData.escalation_policy_id,
        type: 'escalation_policy_reference'
      }
    }
  };

  console.log('Creating service with data:', JSON.stringify(data, null, 2));

  try {
    const response = await axios.post(url, data, config);
    console.log(`Service created: ${response.data.service.id}`);
  } catch (error) {
    if (error.response) {
      // Log the detailed error response from the API
      console.error(`Error creating service: ${JSON.stringify(error.response.data, null, 2)}`);
      
      // Additional specific error handling
      if (error.response.data.error && error.response.data.error.errors) {
        if (error.response.data.error.errors.includes("Escalation policy can't be blank")) {
          console.error('Escalation policy ID is missing or invalid.');
        }
        if (error.response.data.error.message === 'Invalid Input Provided') {
          console.error('There is an issue with the input data provided.');
        }
      }
      if (error.response.status === 401) {
        console.error('Invalid API token. Please check your API token.');
      } else if (error.response.status === 403) {
        console.error('API token does not have the required permissions.');
      } else if (error.response.status === 404) {
        console.error('The requested resource was not found.');
      }
    } else {
      // Log the generic error message
      console.error(`Error creating service: ${error.message}`);
    }
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
    })
    .on('error', (error) => {
      console.error(`Error reading CSV file: ${error.message}`);
    });
}

processCSVAndCreateServices();
