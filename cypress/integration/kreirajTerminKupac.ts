/// <reference types="cypress" />

export const module = 1;

describe("User can login and crate an appointment", () => {

  it("Fill the login form and submit with enter", () => {
    cy.visit("/login");

    cy.get("[data-cy=button_email]").click();

    cy.getInput("email")
        .type(Cypress.env("userNameKupac"))
        .should("have.value", Cypress.env("userNameKupac")); 
    
    cy.getInput("password")
        .type(Cypress.env("password"))
        .should("have.value", Cypress.env("password"));

    cy.getButton("submit").click();

    cy.location('pathname')
        .should('match', /\/myLocations\/*$/)
        .wait(1000);

    cy.getWaitClick("[data-cy=CypressTest]", 2000);
    cy.getWaitClick("[data-cy=button_newBookingRequest]", 2000);
    cy.getWaitClick(".ArrowLeft__StyledIcon-qst3h5-0", 1000); // "losa oznaka" jer je quickFix za bug, ipak identifier za arrowLeft?
    cy.getWaitClick('[data-cy="osnovna usluga"]', 1000);
    cy.getWaitClick("[data-cy=button_nextStep]", 1000);
    cy.getWaitClick("[data-cy=employee_asd]", 1000); //"[data-cy=employee_null]"

    // temp quickFix; los, malo bolji od dosadasnjeg
    // style identifier se mijenja, smisliti rjesenje
    /*if(cy.get(".styles__WizardNoTimeTitle-vntfsx-63").should("exist")){ // while ne radi
        cy.get("[data-cy=button_undefined]")
            .wait(1000)  
            .click();
        if(!cy.get(".styles__WizardNoTimeTitle-vntfsx-63").should("not.exist")){ // while workaround https://github.com/cypress-io/cypress/issues/8100
            cy.get("[data-cy=button_undefined]") // ? the state of the DOM is immutable ?
                .wait(1000)
                .click();
        }
    }*/ // obrisati multiline comment kad se dode do neradnog dana ... ispraviti

    cy.get(".styles__WizardTimesWrapper-vntfsx-65 > :nth-child(1)").click(); // nastavak gornjeg quickfixa, plan je promjeniti

    cy.get('[data-cy=input_comment]')
        .type("Napominjem napomenu")
        .should("have.value", "Napominjem napomenu");

    cy.get("[data-cy=button_nextStep]")
        .wait(1000)
        .click();

    cy.get(".Toastify__toast-container")
      .should("contain", "Uspješno ste kreirali zahtjev za rezervaciju");

    // uspjesno kreiran termin
    
    cy.get("[data-cy=button_nextStep]")
        .wait(5000)
        .click(); 

  })

  // * BILJESKE: *

  // problem odabira datuma u kalenaru: (1) "while", (2) uporaba stylea koji se mijenja umjesto neceg kao identifier
  // za arrowLeft se koristi style, dodati identifier?

});