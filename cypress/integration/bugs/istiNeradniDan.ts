/// <reference types="cypress" />

export const module = 1;

describe("Owner can login and crate an appointment / check existing", () => {

  // BILJESKE:

  // ocekivano ponasanje: toast koji ne dopusta dva ista neradna dana

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

    cy.wait(3000);
    cy.get('[data-intercom-target="Sidebar-Settings"]')
      .click();

    cy.location('pathname').should('include', '/settings/organization/');

    cy.getWaitClick('[data-intercom-target="Sidebar-Organization-Data"]', 200); // dulji wait ne radi 

    cy.getWaitClick("[data-cy=button_New-Holiday-Button]", 1000);

    cy.get(".DayPickerInput > input")
      .click();

    cy.get(".DayPicker-Day--selected")
      .click(); 

    let text:string = "Novi praznik";

    cy.get("[data-cy=input_description]")
      .type(text)
      .should("have.value", text);

    cy.getWaitClick("[data-cy=button_saveChanges]", 1000);
  
    cy.errorToastVisible("A new holiday has been added");

    // neradni dan uspjesno dodan  

    cy.getWaitClick("[data-cy=button_New-Holiday-Button]", 1000);

    cy.get(".DayPickerInput > input")
      .click();

    cy.get(".DayPicker-Day--selected")
      .click();

     cy.get("[data-cy=input_description]")
      .type(text)
      .should("have.value", text);

    cy.getWaitClick("[data-cy=button_saveChanges]", 1000);

    cy.errorToastVisible("Neradni dan s tim datumom već postoji");

  });
  
});