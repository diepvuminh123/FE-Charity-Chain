import { AuthPage } from '../pageObjects/AuthPage';

describe('Admin/Organization Dashboard Flow', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        status_code: 200,
        data: {
          access_token: 'fake-admin-token'
        }
      }
    }).as('adminLogin');

    cy.intercept('GET', '**/profile', {
      statusCode: 200,
      body: {
        status_code: 200,
        data: {
          id: 99,
          email: 'admin@charity.org',
          full_name: 'Charity Admin',
          role: 0 // Admin/Org Role
        }
      }
    }).as('adminProfile');

    cy.intercept('GET', '**/campaigns*', (req) => {
      // Bỏ qua load HTML từ dev server
      if (req.url.includes(Cypress.config('baseUrl'))) return;

      req.reply({
        statusCode: 200,
        body: {
          status_code: 200,
          data: {
            items: [
              {
                id: 1,
                title: 'Provide Clean Water',
                status: 'Active',
                target_amount: 50000,
                current_amount: 10000
              }
            ]
          }
        }
      });
    }).as('orgCampaigns');
  });

  it('allows an organization admin to view their dashboard', () => {
    cy.visit('/');
    
    // Use App Action to login instantly
    cy.appLogin('admin@charity.org', 'adminpass');
    cy.wait('@adminProfile');

    // Go to admin specifically
    cy.visit('/admin');
    cy.wait('@orgCampaigns');

    // Verify Dashboard specific elements
    cy.contains('Organization Dashboard').should('be.visible');
    cy.contains('h1', 'Welcome back').should('be.visible');
    cy.contains('Total Raised').should('be.visible');
    
    // Verify that the mocked campaigns are rendered in the dashboard
    cy.contains('h3', 'Provide Clean Water').should('be.visible');
  });

  it('can open the Create Project modal directly via UI after App Login', () => {
    cy.visit('/');
    cy.appLogin('admin@charity.org', 'adminpass');
    cy.visit('/admin');
    cy.wait('@orgCampaigns');

    // Click UI button
    cy.contains('button', 'Create Project').click();

    // Verify modal is open
    cy.contains('h3', 'Create New Campaign').should('be.visible');
    cy.contains('label', 'Title').should('be.visible');
    cy.contains('button', 'Cancel').click();
    
    // Verify modal is closed
    cy.contains('h3', 'Create New Campaign').should('not.exist');
  });
});
