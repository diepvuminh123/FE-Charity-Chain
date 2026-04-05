export class CampaignPage {
  static visit() {
    cy.visit('/campaigns');
  }

  static searchFor(term) {
    cy.get('input[placeholder="Search campaigns"]').clear().type(term);
  }

  static filterByStatus(statusName) {
    cy.get('select').select(statusName);
  }

  static getCampaignCards() {
    return cy.get('article');
  }

  static viewCampaign(campaignTitle) {
    this.getCampaignCards()
      .contains('h3', campaignTitle)
      .parents('article')
      .contains('View Campaign')
      .click();
  }

  static getCardByTitle(title) {
    return this.getCampaignCards().filter((_, el) => {
      return Cypress.$(el).find('h3').text().includes(title);
    });
  }
}
