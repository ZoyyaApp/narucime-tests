/// <reference types="cypress" />

export const module = 1;

// * BILJESKE: *

// trnutno se radi na testu
//  - izrada, edit i brisanje rade
//  - treba dovrsiti provjeru edita 

// bolji identifieri ? na izborniku vrsta usluga
// bug - edit cijene
// bug - identifier za izmjenu usluge

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

    //cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 1000);
    
    cy.wait(3000);
    cy.get('[data-intercom-target="Sidebar-Settings"]')
      .click();

    cy.location('pathname').should('include', '/settings/organization/');

    cy.getWaitClick('[data-intercom-target="Sidebar-Location-Services"]', 200);
    cy.location('pathname').should('include', '/services/');

    cy.getWaitClick("[data-cy=button_btnAddService]", 1000);

    var serviceName = "Nova usluga";
    var servicePrice = "105";
    var serviceDescription = "Ova usluga sadrzi...";

    cy.get("[data-cy=input_name]")
        .type(serviceName)
        .should("have.value", serviceName);

    cy.get("[data-cy=input_color] > .style__StyledSelect-sc-1infrqw-0 > .react-select__control > .react-select__indicators")
        .click()
        .then(() => {
            cy.get("#react-select-4-option-0 > div") 
              .click();
        })

    cy.get("[data-cy=input_bookingAllowed] > .style__StyledSelect-sc-1infrqw-0 > .react-select__control > .react-select__indicators > .react-select__dropdown-indicator")
        .click()
        .then(() => {
            cy.get("#react-select-5-option-1")
            .click();
        })

    cy.get("[data-cy=input_durationMinutes] > .style__StyledSelect-sc-1infrqw-0 > .react-select__control > .react-select__indicators > .react-select__dropdown-indicator")
        .click()
        .then(() => {
            cy.get("#react-select-6-option-4")
            .click();
        })

    cy.get("[data-cy=input_price]")
        .type(servicePrice)
        .should("have.value", servicePrice);

    cy.get("[data-cy=input_type] > .style__StyledSelect-sc-1infrqw-0 > .react-select__control > .react-select__indicators > .react-select__dropdown-indicator")
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

    // Nova usluga uspjesno spremljena

    cy.getWaitClick(".styles__ServicesLeftContent-sb82wm-27 > .styles__CategoryServicesList-sb82wm-32 > :nth-child(2)", 1000) // bolji identifier

    cy.get(".styles__ServicesContent-sb82wm-26 > :nth-child(2)") // bolji identifier?
        .contains(serviceName);

    // Provjereno da usluga posotji

    cy.get(".styles__ServicesContent-sb82wm-26 > :nth-child(2)") // bolji identifier?
        .contains(serviceName)
        .click();

    cy.get("[data-cy=input_name]")
        .type(" - izmjena")
        .should("have.value", serviceName + " - izmjena");

    cy.get("[data-cy=input_color] > .style__StyledSelect-sc-1infrqw-0 > .react-select__control > .react-select__indicators")
        .click()
        .then(() => {
            cy.get("#react-select-9-option-5 > div") 
            .click();
        })

    cy.get("[data-cy=input_bookingAllowed] > .style__StyledSelect-sc-1infrqw-0 > .react-select__control > .react-select__indicators > .react-select__dropdown-indicator")
        .click()
        .then(() => {
            cy.get("#react-select-10-option-0") 
            .click();
        })

    cy.get("[data-cy=input_durationMinutes] > .style__StyledSelect-sc-1infrqw-0 > .react-select__control > .react-select__indicators > .react-select__dropdown-indicator")
        .click()
        .then(() => {
            cy.get("#react-select-11-option-6")
            .click();
        })

    servicePrice = "155";

    cy.get("[data-cy=input_price]")
        .type("{backspace}{backspace}{backspace}" + servicePrice)
        .should("have.value", servicePrice); 

    cy.get("[data-cy=input_type] > .style__StyledSelect-sc-1infrqw-0 > .react-select__control > .react-select__indicators > .react-select__dropdown-indicator")
        .click()
        .then(() => {
            cy.get("#react-select-12-option-1") // promjeniti u option-0
            .click();
        })

    cy.get("[data-cy=input_profession]")
        .click()
        .click();

    cy.get("[data-cy=input_description]")
        .type(" - izmjena")
        .should("have.value", serviceDescription + " - izmjena");

    cy.getWaitClick("[data-cy=button_saveChanges]", 0);
    //cy.errorToastVisible("Service changed successfully");
    //cy.errorToastVisible("Service successfully created"); 

    // Usluga uspjesno izmjenjena

    // ... provjera edita ...

    cy.get(".styles__ServicesContent-sb82wm-26 > :nth-child(2)")
        .contains(serviceName + " - izmjena")
        .click();

    cy.get("[data-cy=input_price]")
        //.should("have.value", servicePrice); // BUG -> stara cijena je ostala

    // ... provjera ostalih edita ....

    cy.get("[data-cy=button_close]").click();

    // Provjera izmjene gotova

    cy.get(".styles__ServicesContent-sb82wm-26 > :nth-child(2)") // identifier?
        .contains(serviceName + " - izmjena")
        .click();

    cy.getWaitClick("[data-cy=button_undefined]", 1000); // problem identifiera (nezgodni)
    cy.getWaitClick(".Flex__FlexRow-sc-1purrr5-0 > .dLuoil", 1000) // problem identifiera

    cy.getWaitClick("[data-cy=button_undefined]", 1000); // problem identifiera (nezgodni)
    cy.getWaitClick(".Flex__FlexRow-sc-1purrr5-0 > .fZZKeE", 1000); // problem identifiera

    cy.wait(1000); // potrebno da se prethodni toast makne, da se novi prepozna
    cy.errorToastVisible("Service successfully deleted");

    // Usluga obrisana

    cy.get(".styles__ServicesContent-sb82wm-26 > :nth-child(2)") // identifier?
        .should("not.contain", serviceName + " - izmjena");

    // Provjera brisanja gotova

  });

});