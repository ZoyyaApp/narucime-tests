/// <reference types="cypress" />

export const module = 1;

// * BILJESKE: *

// problem toasta - samo jednog

// problematicni identifieri 
// problem brisanje usluge - uzrokuje identifier   

describe("Owner can login and crate an appointment / edit existing / delete", () => {

  it("Test creating, editing and deleting an appointment", () => {
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
    cy.errorToastVisible("A new holiday has been added"); // "Novi praznik je upisan"

    // neradni dan uspjesno dodan  

    cy.get(".styles__TableStyled-oksjky-0")
      .contains(text)
      
    // provjereno da je neradni dan dodan

    cy.get(".styles__TableStyled-oksjky-0")
      .contains(text)
      .wait(1000)
      .click();
    
    cy.get(".DayPickerInput > input")
      .click();

    cy.getFormatedDate(3).then(returned_value => {
      cy.isSameMonth(3).then(return_bool => {
        if(!return_bool) cy.get(".DayPicker-NavButton--next").click();
      })
      var dateIdentifier = '[aria-label="' + returned_value +'"]';
      cy.get(dateIdentifier).click()
    });
    
    cy.get("[data-cy=input_description]")
      .type(" - izmjena")
      .should("have.value", text + " - izmjena");

    cy.getWaitClick("[data-cy=button_saveChanges]", 1000);
    //cy.errorToastVisible("The holiday has been successfully modified"); // "Praznik je uspješno izmjenjen"

    // neradni dan uspjesno izmjenjen

    cy.get(".styles__TableStyled-oksjky-0")
      .contains(text + " - izmjena")
      
    // provjereno da je neradni dan izmjenjen  

    cy.get(".styles__TableStyled-oksjky-0")
      .contains(text)
      .then(($btn) => {
        cy.get("[data-cy=tooltip_button_delete_holiday_0]")
        .wait(1000)
        .click();
      })

    cy.getWaitClick(".mbsc-fr-btn1", 1000); // dodati bolji identifier?
    //cy.errorToastVisible("The holiday has been successfully modified"); // krivi identidier?

    // neradni dan uspjesno obrisan  

    cy.get(".styles__TableStyled-oksjky-0")
      .should("not.contain", text + " - izmjena");

    // provjera daje neradni dan obrisan

  });

});
