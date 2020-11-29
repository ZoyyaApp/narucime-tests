/// <reference types="cypress" />

export const module = 1;

// * BILJESKE: *

// trnutno se radi na testu ...

// problem promjene identifiera pri pokretanjima

describe("Owner can login and crate a service / edit existing / delete", () => {

  it("Create a new service", () => {
      
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

    cy.getWaitClick('[data-intercom-target="Sidebar-Location-Services"]', 200); // dulji wait ne radi 
    cy.location('pathname').should('include', '/services/');

    cy.getWaitClick("[data-cy=button_btnAddService]", 1000);

    var serviceName = "Nova usluga";
    var servicePrice = "105";
    var serviceDescription = "Ova usluga sadrzi...";

    cy.get("[data-cy=input_name]")
        .type(serviceName)
        .should("have.value", serviceName);

    // ... boje ...

    cy.get("[data-cy=input_bookingAllowed]")
        .click()
        .then(() => {
            cy.get("#react-select-5-option-1") // identifier se mijenja izmedu 4 i 5 pri pokretanjima ...
            .click();
        })

    cy.get("[data-cy=input_durationMinutes]")
        .click()
        .then(() => {
            cy.get("#react-select-6-option-4")
            .click();
        })

    cy.get("[data-cy=input_price]")
        .type(servicePrice)
        .should("have.value", servicePrice);

    cy.get("[data-cy=input_type]")
        .click()
        .then(() => {
            cy.get("#react-select-7-option-1")
            .click();
        })

    cy.get("[data-cy=input_profession]")
        .click()
        .click();

    cy.get("[data-cy=input_description]")
        .type(serviceDescription)
        .should("have.value", serviceDescription);

    cy.getWaitClick("[data-cy=button_saveChanges]", 1000)
    cy.errorToastVisible("Service successfully created");

    // enter -> niti savea niti zatvara

    // Nova usluga uspjesno spremljena

    cy.getWaitClick(".gcwKBr", 1000) // bolji identifier

    cy.get(".styles__ServicesContent-sb82wm-26 > :nth-child(2)")
        .contains(serviceName);

    // Provjereno da usluga posotji

    // ... edit usluge ...

    // ... provjera edita ...

    cy.get(".styles__ServicesContent-sb82wm-26 > :nth-child(2)") // identifier?
        .contains(serviceName)
        .click();

    cy.getWaitClick("[data-cy=button_undefined]", 1000); // problem identifiera

    cy.getWaitClick(".Flex__FlexRow-sc-1purrr5-0 > .fZZKeE", 1000); // problem identifiera

    cy.wait(1000); // da se prethodni toast makne
    cy.errorToastVisible("Service changed successfully");

    // Usluga obrisana

    cy.get(".styles__ServicesContent-sb82wm-26 > :nth-child(2)") // identifier?
        .should("not.contain", serviceName);

    // Provjera brisanja 

  });

});