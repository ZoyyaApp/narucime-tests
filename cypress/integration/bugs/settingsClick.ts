/// <reference types="cypress" />

export const module = 1;

describe("Test clicking on settings button after spinner dissapears", () => {

  it("Login", () => {
    
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

    //.styles__Spinner-iugvqw-2

    // Oba "rjesenja" trenutno ne rade

    //cy.waitUntil(function() {return cy.get(".styles__Spinner-iugvqw-2").should('not.exist')}); // zapne u besk. petlji

    cy.log("", Cypress.$('.styles__Spinner-iugvqw-2').length);
    cy.waitUntil(function() {return Cypress.$('.styles__Spinner-iugvqw-2').length!=0}); // ne ceka iako su oba loga 0
    cy.log("", Cypress.$('.styles__Spinner-iugvqw-2').length);
    cy.get('[data-intercom-target="Sidebar-Settings"]').click();

  })

})