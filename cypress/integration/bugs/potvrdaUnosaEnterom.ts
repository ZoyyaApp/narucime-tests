/// <reference types="cypress" />

export const module = 1;

describe("Owner can login and crate an appointment / check existing", () => {

  // BILJESKE

  // dodati da "dinamicki bira datum"; kod u upisIzmjena...
  // ocekivanjo ponsasanje: pritiskom enetera se Novi praznik sprema

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

    cy.get('[aria-label="pet. 20. stu. 2020"]') // ?dodati da uvijek bira 2 dana od danas?
      .click()
    
    let text:string = "Novi praznik";

    cy.get("[data-cy=input_description]")
      .type(text)
      .should("have.value", text)
      .type("{enter}");

    cy.errorToastVisible("A new holiday has been added");

    /* 
    test prisskom na enter nakon unosa teksta odlazi s https://narucime-dev.azurewebsites.net/bnenl/115/settings/organization/locations/115/holidays/new
    i vraca se na https://narucime-dev.azurewebsites.net/bnenl/115/settings/organization/locations/115/holidays 
    
    ocekivanjo ponsasanje: pritiskom enetera se Novi praznik sprema
    */
 
    });
    
});