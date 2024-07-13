In order to use this script to create Services in your PagerDuty account using the API, please check the below:

  1. Prerequisites:
      - Node.js: Ensure Node.js is installed on your machine. You can download it from the [Node.js official website](https://nodejs.org/en).
      - CSV File: Have the CSV file (services.csv) in the appropriate format as provided, e.g.
    
        | name          | description   |  escalation_policy_id | 
        | ------------- | ------------- | --------------------- |
        | Service1      | Description1  |  EP123
        | Service2      | Description2  |  EP456

  2. Install Required Packages:
     - Open your terminal and navigate to the directory where you have saved the script.
     - Run the following command to install the necessary packages: npm install axios csv-parser

  3. Update the script and replace the placeholder:
     - In the script attached provided to you, replace '<YOUR_API_TOKEN>' with your actual PagerDuty API token and replace 'path/to/services.csv' with the path to your CSV file. You can find your API Key on your PagerDuty account by heading over to Integrations > API Access Keys
     - Save the script again to ensure it is updated with the above information
     - Make sure to place the 'services.csv' file in the same directory you updated on the script

  4. Run the Script:
     - Open your terminal, navigate to the directory containing the script, and run: node [bulk_create_services.js](https://github.com/sdqali96/pagerduty-tse-assignment/blob/main/bulk_create_services.js)
