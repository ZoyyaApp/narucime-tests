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

    cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 1000);

    cy.location('pathname').should('include', '/settings/organization/');

    cy.getWaitClick('[data-intercom-target="Sidebar-Organization-Data"]', 200); // dulji wait ne radi 

    cy.getWaitClick("[data-cy=button_New-Holiday-Button]", 1000);

    cy.get(".DayPickerInput > input")
      .click();

    cy.get('[aria-label="pet. 20. stu. 2020"]') // ?dodati da uvijek bira 2 dana od danas?
      .click()
    // zanemariti prvih 5 znakova

    cy.get("[data-cy=iasasdsdnput_description]");

    let text:string = "Novi praznik";

    cy.get("[data-cy=input_description]")
      .type(text)
      .should("have.value", text);

    cy.getWaitClick("[data-cy=button_saveChanges]", 1000);

    cy.get(".Toastify__toast-container")
      .should("contain", "Novi praznik je upisan");

    // neradni dan uspjesno dodan  

    //cy.get(":nth-child(1) > .styles__TableItem-qmnykg-41").should("exist"); 
    // contains umjesto get
    cy.getFirstWaitClick(":nth-child(1) > .styles__TableItem-qmnykg-41", 1000) // uvijek brise prvi neradni dan, dodati da uvijek bira dodan neradnu dan
    
    cy.get(".DayPickerInput > input")
      .click();

    cy.get('[aria-label="ned. 22. stu. 2020"]') // ?dodati da uvijek bira 2 dana od postojeceg datuma?
      .click();
    
    cy.get("[data-cy=input_description]")
      .type(" - izmjena")
      .should("have.value", text + " - izmjena");

    cy.getWaitClick("[data-cy=button_saveChanges]", 1000);

    cy.get(".Toastify__toast-container")
      .should("contain", "Praznik je uspješno izmjenjen");

    // neradni dan uspjesno izmjenjen  

    cy.getFirstWaitClick("[data-cy=tooltip_button_undefined]", 1000);
    cy.getWaitClick(".mbsc-fr-btn1", 1000); // dodati bolji identifier?

    cy.get(".Toastify__toast-container")
      .should("contain", "Praznik je uspješno izmjenjen");
 
    });
    
});