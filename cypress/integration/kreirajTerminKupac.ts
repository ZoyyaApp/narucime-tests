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

    cy.location('pathname').should('match', /\/myLocations\/*$/)

    cy.get("[data-cy=CypressTest]")
        .wait(1000)
        .click();
    
    cy.get("[data-cy=button_newBookingRequest]")
        .wait(1000)
        .click();

    cy.get(".ArrowLeft__StyledIcon-qst3h5-0")
        .wait(1000)
        .click();

    cy.get('[data-cy="osnovna usluga"]')
        .wait(1000)
        .click();

    cy.get("[data-cy=button_nextStep]") 
        .wait(1000)
        .click();
    
    // bez .wait(1000) linije kasni ucitavanje djelatnika i zapinje 

    cy.get("[data-cy=employee_asd]") //"[data-cy=employee_null]"
        .wait(1000) 
        .click();

    //while(cy.get(".styles__WizardNoTimeTitle-vntfsx-63")){
        // problem while
        cy.get("[data-cy=button_undefined]")
            .wait(1000)
            .click();
    //}

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

    cy.get(".Icon__StyledIcon-agp2fb-0 > g > path")
        .wait(1000)
        .click();

    cy.get("[data-cy=menuItem_logout]")
        .wait(1000)
        .click();

    cy.get(".styles__NavigationNav-oan1l6-6 > :nth-child(3)")
        .wait(1000)
        .click();

  })


});