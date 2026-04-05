// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Example of Application Actions (App Actions) mapping in Cypress:
Cypress.Commands.add('appLogin', (email, password) => {
  cy.window().its('appContext').then((context) => {
    // Expected we expose a context/object mapped to `window.appContext`
    // within our React App for setting state quickly.
    return context.login(email, password);
  });
});
