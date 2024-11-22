const { defineConfig } = require('cypress');  
  
module.exports = defineConfig({  
  e2e: {  
   setupNodeEvents(on, config) {  
    // Example of setting up custom event listeners if needed  
    on('after:screenshot', (details) => {  
      console.log('Screenshot taken:', details);  
    });  
   },  
   baseUrl: 'http://18.143.78.26/', // Replace with your app's base URL  
   supportFile: false, // Disable the support file if not needed  
   screenshotOnRunFailure: true, // Automatically take screenshots on test failure  
   video: false, // Disable video recording if not required  
  
   // Reporter configuration  
   reporter: 'mochawesome', // Set Mochawesome as the reporter  
   reporterOptions: {  
    reportDir: 'cypress/reports', // Directory to save reports  
    overwrite: false, // Do not overwrite previous reports  
    html: true, // Enable HTML reports  
    json: true, // Enable JSON reports  
    reportFilename: 'index.html', // Set the report filename  
    screenshots: true, // Embed screenshots in the Mochawesome report  
   },  
  },  
});