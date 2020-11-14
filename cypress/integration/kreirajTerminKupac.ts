/// <reference types="cypress" />

export const module = 1;

describe("User can login and crate an appointment", () => {

  it("Fill the login form and submit with enter", () => {
    cy.visit("/login");

    cy.get("[data-cy=button_phone]").first().click();

    cy.getInput("email")
        .type(Cypress.env("userNameKupac"))
        .should("have.value", Cypress.env("userNameKupac")); // userName -> email
    
    cy.getInput("password")
        .type(Cypress.env("password"))
        .should("have.value", Cypress.env("password"));

    cy.getButton("submit").click();

    cy.location('pathname')
        .should('match', /\/myLocations\/*$/)
        .wait(1000);

    cy.getWaitClick("[data-cy=CypressTest]", 1000);
    cy.getWaitClick("[data-cy=button_newBookingRequest]", 1000);
    cy.getWaitClick(".ArrowLeft__StyledIcon-qst3h5-0", 1000);
    cy.getWaitClick('[data-cy="osnovna usluga"]', 1000);
    cy.getWaitClick("[data-cy=button_nextStep]", 1000);
    cy.getWaitClick("[data-cy=employee_asd]", 1000); //"[data-cy=employee_null]"

        
    if(cy.get(".styles__WizardNoTimeTitle-vntfsx-63")){ // while ne radi
        cy.get("[data-cy=button_undefined]")
            .wait(1000)  
            .click();
    }

    if(cy.get(".styles__WizardNoTimeTitle-vntfsx-63")){ // while workaround https://github.com/cypress-io/cypress/issues/8100
        cy.get("[data-cy=button_undefined]") // ? the state of the DOM is immutable ?
            .wait(1000)  
            .click();
    }

    cy.get(".styles__WizardTimesWrapper-vntfsx-65 > :nth-child(1)").click();

    cy.get('[data-cy=input_comment]')
        .type("Napominjem napomenu")
        .should("have.value", "Napominjem napomenu");

    cy.get("[data-cy=button_nextStep]")
        .wait(1000)
        .click();

    // provjera pop-up-a?

    // uspjesno kreiran termin

    cy.get("[data-cy=button_nextStep]")
        //.wait(1000)
        //.click(); 

    // click ne radi?

  })


});