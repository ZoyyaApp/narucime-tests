/// <reference types="cypress" />

export const module = 1;

describe("Owner can login and crate an appointment / check existing", () => {

  it("Fill the login form and submit with enter", () => {
    cy.visit("/login");

    cy.get("[data-cy=button_email]").click();

    cy.getInput("email")
        .type(Cypress.env("userName"))
        .should("have.value", Cypress.env("userName")); // userName -> email
    
    cy.getInput("password")
        .type(Cypress.env("password"))
        .should("have.value", Cypress.env("password"));

    cy.getButton("submit").click();

    cy.location('pathname').should('match', /\/calendar\/day\/*$/)

    cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 1000);

    cy.location('pathname').should('include', '/settings/organization/');

    //cy.getWaitClick('[data-intercom-target="Sidebar-Organization-Data"]', 1000);
    cy.get('[data-intercom-target="Sidebar-Organization-Data"]')
      .eq(3)
      //.wait(1000)
      .click();
    // problem 'identifiera', ?wait ne radi zajedno s eq?

    cy.getWaitClick("[data-cy=button_undefined]", 1000);

    cy.get(".DayPickerInput > input")
      .click();

    //... ? potreban za odabit datuma
    
    cy.get("[data-cy=input_description]")
      .type("Novi praznik")
      .should("have.value", "Novi praznik");

    cy.getWaitClick("[data-cy=button_saveChanges]", 1000);

    // neradni dan uspjesno dodan + ?toasty provjera? 

    // ... izmjena neradnog dana

    cy.getWaitClick("[data-cy=tooltip_button_undefined]", 1000);
    cy.getWaitClick(".mbsc-fr-btn1", 1000);

    // neradni dan uspjesno obrisan + ?toasty provjera? 

  });

});
