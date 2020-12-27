/// <reference types="cypress" />

export const module = 1;

/* BILJESKE:

    1. - idnetifieri na sidebaru

*/

describe("Owner can login and edit branch data", () => {

  beforeEach("Login", () => {
    
    cy.visit("/login");
    cy.get("[data-cy=button_email]").click();

    cy.getInput("email")
        .type(Cypress.env("userName"))
        .should("have.value", Cypress.env("userName")); 
    
    cy.getInput("password")
        .type(Cypress.env("password"))
        .should("have.value", Cypress.env("password"));

    cy.getButton("submit").click();
    cy.location('pathname').should('match', /\/calendar\/day\/*$/);

    //cy.getWaitClick(".dUbUBi@", 500); // identifier!
    //cy.getFirstWaitClick(".hyiaHA", 500); // identifier!

  })

  it("Change Branch data", () => {

    cy.wait(3000);
    cy.get('[data-intercom-target="Sidebar-Settings"]')
      .click();
    //cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 500); 
  
  })

  it("Confirm Branch data changes", () => {
    
    cy.wait(3000);
    cy.get('[data-intercom-target="Sidebar-Settings"]')
      .click();
    //cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 500); 
  
  })

  it("Revert Branch data changes", () => {
    
    cy.wait(3000);
    cy.get('[data-intercom-target="Sidebar-Settings"]')
      .click();
    //cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 500); 
  
  })

})