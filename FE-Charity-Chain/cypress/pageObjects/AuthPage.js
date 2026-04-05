export class AuthPage {
  static visitLogin() {
    cy.visit('/login');
  }

  static visitRegister() {
    cy.visit('/register');
  }

  // --- Actions ---
  static fillLoginForm(email, password) {
    cy.get('#email').clear().type(email);
    cy.get('#password').clear().type(password);
  }

  static fillRegisterForm(name, email, password, confirmPassword) {
    cy.get('#full_name').clear().type(name);
    cy.get('#email').clear().type(email);
    cy.get('#password').clear().type(password);
    cy.get('#confirmPassword').clear().type(confirmPassword);
  }

  static submitLogin() {
    cy.get('button[type="submit"]').contains(/Log in/i).click();
  }

  static submitRegister() {
    cy.get('button[type="submit"]').contains(/Register/i).click();
  }

  // --- Assertions ---
  static verifyErrorMessage(message) {
    cy.contains(message).should('be.visible');
  }
}
