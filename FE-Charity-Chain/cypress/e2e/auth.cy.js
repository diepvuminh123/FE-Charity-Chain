import { AuthPage } from '../pageObjects/AuthPage';

describe('Authentication Flow (Mocked)', () => {
  beforeEach(() => {
    // Intercept API calls to ensure deterministic state and avoid hitting a real backend.
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
          role: 1 // Regular user for example
        }
      }
    }).as('getProfile');
  });

  it('can log in correctly with stubbed API', () => {
    AuthPage.visitLogin();
    AuthPage.fillLoginForm('test@example.com', 'password123');
    AuthPage.submitLogin();
    
    // Eliminating Flakiness: Wait strictly for the intercept instead of arbitrary wait
    cy.wait('@loginRequest');
    cy.wait('@getProfile');

    // Assert that we navigated away from login (e.g. to Dashboard/Home)
    cy.url().should('not.include', '/login');
  });
});