/// <reference types="cypress" />

export const module = 1;

/* BILJESKE:

    1. - 0

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

  })

  it("Change Branch data", () => {

    cy.wait(3000);
    cy.get('[data-intercom-target="Sidebar-Settings"]')
      .click();
    //cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 500); 

    cy.get("[data-cy=input_name]")
      .should("have.value", "CypressTest")
      .type(" - izmjena")
      .should("have.value", "CypressTest - izmjena");

      cy.get("[data-cy=input_description]")
        .should("have.value", "asdf")
        .type(" gh")
        .should("have.value", "asdf gh");

      cy.get("[data-cy=input_address]")
        .should("have.value", "Trg")
        .type(" bana J.J.")
        .should("have.value", "Trg bana J.J.");

      cy.get("[data-cy=input_zipCode]")
        .should("have.value", "10000")
        .type("{backspace}{backspace}22")
        .should("have.value", "10022");

      cy.get("[data-cy=input_city]")
        .should("have.value", "Zagreb")
        .type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}Odra")
        .should("have.value", "Odra");

      /*cy.get(".react-select__dropdown-indicator")
        .should("have.value", "asdf")
        .type(" gh")
        .should("have.value", "asdf gh");*/

      cy.get("[data-cy=button_saveChanges]")
        .click();
  
  })

  it("Confirm and revert Branch data changes", () => {
    
    cy.wait(3000);
    cy.get('[data-intercom-target="Sidebar-Settings"]')
      .click();
    //cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 500); 

    cy.get("[data-cy=input_name]")
      .should("have.value", "CypressTest - izmjena")
      .type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}")
      .should("have.value", "CypressTest");

      cy.get("[data-cy=input_description]")
        .should("have.value", "asdf gh")
        .type("{backspace}{backspace}{backspace}")
        .should("have.value", "asdf");

      cy.get("[data-cy=input_address]")
        .should("have.value", "Trg bana J.J.")
        .type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}")
        .should("have.value", "Trg");

        cy.get("[data-cy=input_zipCode]")
        .should("have.value", "10022")
        .type("{backspace}{backspace}00")
        .should("have.value", "10000");

      cy.get("[data-cy=input_city]")
        .should("have.value", "Odra")
        .type("{backspace}{backspace}{backspace}{backspace}Zagreb")
        .should("have.value", "Zagreb");

      /*cy.get(".react-select__dropdown-indicator")
        .should("have.value", "asdf")
        .type(" gh")
        .should("have.value", "asdf gh");*/

      cy.get("[data-cy=button_saveChanges]")
        .click();
  
  })

  it("Confirm Branch data changes revertes successfully", () => {
    
    cy.wait(3000);
    cy.get('[data-intercom-target="Sidebar-Settings"]')
      .click();
    //cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 500); 

    cy.get("[data-cy=input_name]")
      .should("have.value", "CypressTest");

      cy.get("[data-cy=input_description]")
        .should("have.value", "asdf");

      cy.get("[data-cy=input_address]")
        .should("have.value", "Trg");

        cy.get("[data-cy=input_zipCode]")
        .should("have.value", "10000");

      cy.get("[data-cy=input_city]")
        .should("have.value", "Zagreb");

      /*cy.get(".react-select__dropdown-indicator")
        .should("have.value", "asdf")
        .type(" gh")
        .should("have.value", "asdf gh");*/
  
  })

})