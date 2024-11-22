describe('Kaizen Homepage Tests', () => {
    beforeEach(() => {
      cy.visit('https://18.143.78.26/kaizen-website/')
    })
  
    describe('Navigation and Header', () => {
      it('should have working navigation links', () => {
        cy.get('nav').within(() => {
          cy.contains('About Us').should('be.visible').and('have.attr', 'http://18.143.78.26/kaizen-website/about.html')
          cy.contains('Solutions').should('be.visible').and('have.attr', 'http://18.143.78.26/kaizen-website/solutions.html')
          cy.contains('Brand Journey').should('be.visible').and('have.attr', 'http://18.143.78.26/kaizen-website/brand-journey.html')
          cy.contains('Products').should('be.visible').and('have.attr', 'http://18.143.78.26/kaizen-website/products.html')
          cy.contains('Projects').should('be.visible').and('have.attr', 'http://18.143.78.26/kaizen-website/projects.html')
          cy.contains('Clients').should('be.visible').and('have.attr', 'http://18.143.78.26/kaizen-website/client.html')
          cy.contains('Blog').should('be.visible').and('have.attr', 'http://18.143.78.26/kaizen-website/blog.html')
          cy.contains('Contact Us').should('be.visible').and('have.attr', 'http://18.143.78.26/kaizen-website/contact-us.html')
          cy.screenshot('working links');        
        })
      })
  
      it('should have a visible logo', () => {
        cy.get('img[alt="Kaizen Smartbuild logo"]').should('be.visible')
        cy.screenshot('logo'); 
      })
    })
  
    describe('About Us Section', () => {
      it('should display main heading and content', () => {
        cy.contains('h1', 'About us').should('be.visible')
        cy.contains('KAIZEN STEEL BUILDING SOLUTIONS PVT LTD').should('be.visible')
        cy.contains('premier turnkey Pre-engineered Building').should('be.visible')
        cy.screenshot('heading display'); 
      })
  
      it('should have About Us button', () => {
        cy.contains('button', 'ABOUT US').should('be.visible').and('be.enabled')
        cy.screenshot('about us button'); 
      })
    })
  
    describe('Vision Section', () => {
      it('should display vision content', () => {
        cy.contains('Our Vision').should('be.visible')
        cy.contains('Building Solutions by Kaizen Smartbuild').should('be.visible')
        cy.contains('our vision is to be a global leader').should('be.visible')
      })
    })
  
    describe('Contact Information', () => {
      it('should display contact details', () => {
        cy.contains('Get in Touch').should('be.visible')
        cy.contains('409, D MALL NETAJI SUBHASH PLACE - DELHI-110034').should('be.visible')
        cy.contains('B17-327 RAK CUSTOM BUILDING RAKEZ, DUBAI, UAE').should('be.visible')
        cy.screenshot('contact information'); 
      })
  
      it('should have valid phone numbers', () => {
        cy.contains('+91-9315859051').should('be.visible')
        cy.contains('+91-8750000131').should('be.visible')
        cy.contains('+91-508560131').should('be.visible')
        cy.screenshot('valid phone number'); 
      })
  
      it('should have valid email', () => {
        cy.contains('info@kaizenpeb.com').should('be.visible')
        cy.screenshot('emailid valid'); 
      })
    })
  
    describe('Social Media Links', () => {
      it('should have social media icons', () => {
        cy.get('[href*="facebook"]').should('be.visible')
        cy.get('[href*="instagram"]').should('be.visible')
        cy.get('[href*="youtube"]').should('be.visible')
        cy.get('[href*="whatsapp"]').should('be.visible')
        cy.screenshot('social links'); 
      })
    })
  
    describe('Responsive Design', () => {
      it('should be responsive on mobile viewport', () => {
        cy.viewport('iphone-x')
        cy.contains('About us').should('be.visible')
        cy.contains('Get in Touch').should('be.visible')
        cy.screenshot('responsibe'); 
      })
  
      it('should be responsive on tablet viewport', () => {
        cy.viewport('ipad-2')
        cy.contains('About us').should('be.visible')
        cy.contains('Get in Touch').should('be.visible')
        cy.screenshot('working responsive tablet'); 
      })
    })
  
    describe('Performance and Loading', () => {
      it('should load images properly', () => {
        cy.get('img').should('be.visible').and(($imgs) => {
          $imgs.each((i, img) => {
            expect(img.naturalWidth).to.be.greaterThan(0)
            cy.screenshot('working performance logo images'); 
          })
        })
      })
    })
  
    describe('Form Validation', () => {
      it('should validate contact form if present', () => {
        cy.get('form').then($form => {
          if ($form.length) {
            cy.get('input[type="email"]').type('invalid-email')
            cy.get('form').submit()
            cy.get('form').should('contain.text', 'valid email')
          }
        })
      })
    })
  })