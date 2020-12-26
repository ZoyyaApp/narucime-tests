/// <reference types="cypress" />

export const module = 1;

describe("Owner can login and crate an appointment / check existing", () => {

  it("Fill the login form and submit with enter", () => {
    cy.visit("/login");

    cy.get("[data-cy=button_email]").click();

    cy.getInput("email")
        .type(Cypress.env("userName"))
        .should("have.value", Cypress.env("userName")); 
    
    cy.getInput("password")
        .type(Cypress.env("password"))
        .should("have.value", Cypress.env("password"));

    cy.getButton("submit").click();

    cy.location('pathname').should('match', /\/calendar\/day\/*$/)

    //cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 1000);
    
    cy.wait(2000);
    cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 1000);

    cy.location('pathname').should('include', '/settings/organization/');

    cy.getWaitClick('[data-intercom-target="Sidebar-Organization-Data"]', 1000); 
    
    // test ovdje pada -> "uspjesno"

  });
  
});