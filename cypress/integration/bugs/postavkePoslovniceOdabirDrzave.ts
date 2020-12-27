/// <reference types="cypress" />

export const module = 1;

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

  })

  it("Click on Country selection dropdown", () => {

    cy.wait(3000);
    cy.get('[data-intercom-target="Sidebar-Settings"]')
      .click();

    cy.get(".react-select__dropdown-indicator")
        .click();
        
    cy.wait(10000);

  })

})