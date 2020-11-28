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

    cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 1000);

    cy.location('pathname').should('include', '/settings/organization/');

    cy.getWaitClick('[data-intercom-target="Sidebar-Organization-Data"]', 200); // dulji wait ne radi 

    cy.getWaitClick("[data-cy=button_New-Holiday-Button]", 1000);

    cy.get(".DayPickerInput > input")
      .click();

    cy.getFormatedDate(0).then(returned_value => {
      cy.isSameMonth(0).then(return_bool => {
        if(!return_bool) cy.get(".DayPicker-NavButton--next").click();
      })
      var dateIdentifier = '[aria-label="' + returned_value +'"]';
      cy.get(dateIdentifier).click()
    });  

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

    cy.getFormatedDate(0).then(returned_value => {
      cy.isSameMonth(0).then(return_bool => {
        if(!return_bool) cy.get(".DayPicker-NavButton--next").click();
      })
      var dateIdentifier = '[aria-label="' + returned_value +'"]';
      cy.get(dateIdentifier).click()
    });  

     cy.get("[data-cy=input_description]")
      .type(text)
      .should("have.value", text);

    cy.getWaitClick("[data-cy=button_saveChanges]", 1000);

    cy.errorToastVisible("A holiday with the same date already exists");

    // ocekivano ponasanje: toast koji ne dopusta dva ista neradna dana

  });
  
});