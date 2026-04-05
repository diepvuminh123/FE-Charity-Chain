import { CampaignPage } from '../pageObjects/CampaignPage';

describe('Campaign Flow with App Actions', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        status_code: 200,
        data: {
          access_token: 'fake-jwt-token'
        }
      }
    }).as('loginRequest');

    cy.intercept('GET', '**/profile', {
      statusCode: 200,
      body: {
        status_code: 200,
        data: {
          id: 1,
          email: 'test@example.com',
          full_name: 'Test Setup User',
          role: 1
        }
      }
    }).as('getProfile');

    cy.intercept('GET', '**/campaigns*', (req) => {
      // Bỏ qua nếu là request load file giao diện HTML từ dev server
      if (req.url.includes(Cypress.config('baseUrl'))) return;
      
      req.reply({
        statusCode: 200,
        body: {
          status_code: 200,
          data: {
            items: [
              {
                id: 101,
                title: 'Build a School in the Village',
                status: 'Active',
                target_amount: 10000,
                current_amount: 2500,
                description: 'Help us build a new school.',
                organization: { name: 'Education For All' },
                images: ['https://via.placeholder.com/300']
              }
            ],
            pagination: { total_pages: 1 }
          }
        }
      });
    }).as('getCampaigns');
  });

  it('can view campaigns after quick login via App Actions', () => {
    // Load the app first so window.appContext is ready
    cy.visit('/'); 
    
    // Application Action: log in instantly without UI
    cy.appLogin('test@example.com', 'password123');

    // Wait for state to settle then navigate
    CampaignPage.visit();
    cy.wait('@getCampaigns');

    CampaignPage.getCampaignCards().should('have.length', 1);
    CampaignPage.getCardByTitle('Build a School').should('be.visible');
  });
});
