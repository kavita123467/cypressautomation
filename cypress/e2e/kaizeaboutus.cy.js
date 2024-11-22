//const { describe } = require("mocha")

//suite cases
// Cypress Test: Homepage Functionality
describe('Homepage Functionality', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('kaizen-website/about.html');
    const d=cy.screenshot('homepage-loaded');
    console.log(d);
    cy.wait(2000); // Wait for 2 seconds to ensure the page loads
  });
   // Negative Test: Verify a non-existent URL returns a 404
   it('should return 404 for a non-existent page (Negative)', () => {
    cy.request({
      url: 'kaizen-website/non-existent-page',
      failOnStatusCode: false, // Prevent test failure on non-2xx/3xx responses
    }).then((response) => {
      expect(response.status).to.eq(404); 
      cy.screenshot('invalid-url-error'); // Verify status code
    });
  });

  it('should load the homepage successfully', () => {
    // Check if the homepage loads with status 200
    cy.request('kaizen-website/about.html').then((response) => {
      expect(response.status).to.eq(200); // Verify status code
      cy.screenshot('homepage-success');
    });
  });

  it('should have the correct page title', () => {
    // Verify the title of the homepage
    cy.title().should('include', 'Industrial Steel Manufacturers | Kaizen Smartbuild');
    cy.screenshot('title');
  });
    // Negative Test: Verify an incorrect title is not present
    it('should not include an incorrect title (Negative)', () => {
      cy.title().should('not.include', 'Wrong Title');
      cy.screenshot('incorrecttitle');
    });

  it('should navigate to About Us page', () => {
    // Check if the "About Us" link works
    cy.get('a').contains('About Us').click();
    cy.url().should('include', '/about-us');
    cy.screenshot('failedaboutlink');
  });
   // Negative Test: Verify navigation fails for a broken link
   it('should not navigate to a broken link (Negative)', () => {
    cy.get('a[href="broken-link"]').should('not.exist');
    cy.screenshot('brokenlink');
  });
});

// Cypress Test: Homepage Design Validation
describe('Homepage Design Validation', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('kaizen-website/');
    cy.wait(2000);
    cy.get('body').should('be.visible');
    cy.screenshot('design good'); // Ensure the page is fully loaded
  });

  it('should have the correct logo', () => {
    // Check if the logo image exists and is visible
    cy.get('.logo').should('be.visible'); 
    cy.get('.logo').then(($el) => {
      cy.log('Logo Element:', $el);
      expect($el).to.exist;
      cy.screenshot('logocorrect or incorrect');
    });
    // Adjust the selector for the logo
  });
   // Negative Test: Verify a missing logo does not exist
   it('should not have a missing logo element (Negative)', () => {
    cy.get('.missing-logo').should('not.exist');
    cy.screenshot('missinglogo');
  });

  it('should have the correct header background color', () => {
    // Check the background color of the header
    cy.get('header').should('have.css', 'background-color', 'rgb(255, 255, 255)'); 
    // Adjust as per design
    cy.screenshot('match color');
  });

   // Negative Test: Verify the header does not have an incorrect background color
   it('should not have an incorrect header background color (Negative)', () => {
    cy.get('header').should('not.have.css', 'background-color', 'rgb(0, 0, 0)'); // Black color as a negative case
    cy.screenshot('not match color');
  });
  it('should have the correct font size on the main heading', () => {
    // Check the font size of the main heading
    cy.get('h1').should('have.css', 'font-size', '48px'); // Adjust as per design
    cy.screenshot('fontsize correct');
  });
    // Negative Test: Verify an incorrect font size is not applied
    it('should not have an incorrect font size on the main heading (Negative)', () => {
      cy.get('h1').should('not.have.css', 'font-size', '24px');
      cy.screenshot('fontsize not correct'); // Example of an incorrect font size
    });
});

// Handle uncaught exceptions to prevent test failures
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore specific errors (e.g., related to null properties)
  if (err.message.includes("Cannot read properties of null")) {
    return false; // Prevent Cypress from failing the test
  }
});

//     describe('This is my test 2',function()
//     {

//       it('test3', function() 
//        {
//         //expect(true).to.equal(true)
//       }
//     )
// }
//     )