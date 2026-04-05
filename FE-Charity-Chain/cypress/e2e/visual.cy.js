import { CampaignPage } from '../pageObjects/CampaignPage';

describe('Visual Regression Testing', () => {

  beforeEach(() => {
    // Intercept main views to ensure deterministic UI
    cy.intercept('GET', '**/campaigns*', (req) => {
      // Bỏ qua load HTML dev server
      if (req.url.includes(Cypress.config('baseUrl'))) return;

      req.reply({
        statusCode: 200,
        body: {
          status_code: 200,
          data: {
            items: [
              {
                id: 101,
                title: 'Visual Snapshot Campaign',
                status: 'Active',
                target_amount: 10000,
                current_amount: 2500,
                description: 'A stable campaign for taking Percy snapshots.',
                organization: { name: 'E2E Charity' },
                images: ['https://via.placeholder.com/300']
              }
            ],
            pagination: { total_pages: 1 }
          }
        }
      });
    }).as('getCampaigns');
  });

  it('verifies the Homepage appearance', () => {
    cy.visit('/');
    cy.percySnapshot('Homepage', { widths: [375, 768, 1280] }); 
  });

  it('verifies the Campaigns list appearance', () => {
    CampaignPage.visit();
    cy.wait('@getCampaigns');
    
    // Check that our stable mocked item is present
    CampaignPage.getCardByTitle('Visual Snapshot Campaign').should('be.visible');

    // Take the snapshot after the mocked data is loaded
    cy.percySnapshot('Campaign List');
  });

  it('verifies the Login appearance', () => {
    cy.visit('/login');
    cy.percySnapshot('Login Page');
  });
});
