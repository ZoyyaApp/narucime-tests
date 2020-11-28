/// <reference types="cypress" />

export const module = 1;

// * BILJESKE: *

// problem toasta - samo jednog

// problematicni identifieri na kraju pri brisanju
  // problem identificiranja neradnog dana:
    // (1) problem odabira neradnog dana kad jedan postoji - zaobici style, "jedinstveni" identifier, ne samo redak-stupac?
    // (2) dodati da se uvijek ureduje i brise novo dodan neradni dan, ne prvi koji se pronade - potreban drugaciji identifier
    

describe("Owner can login and crate an appointment / edit existing / delete", () => {

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

    cy.getFormatedDate(2).then(returned_value => {
      cy.isSameMonth(2).then(return_bool => {
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

    cy.errorToastVisible("A new holiday has been added"); // "Novi praznik je upisan"

    // neradni dan uspjesno dodan  

    //cy.get(":nth-child(1) > .styles__TableItem-qmnykg-41").should("exist"); 
    // contains umjesto get
    
    cy.get(".styles__TableStyled-oksjky-0")
      .contains(text)
      .wait(1000)
      .click();
    
    //cy.getFirstWaitClick(":nth-child(1) > .styles__TableItem-qmnykg-41", 1000) // uvijek brise prvi neradni dan, dodati da uvijek bira dodan neradnu dan
    
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

    //cy.getFirstWaitClick("[data-cy=tooltip_button_undefined]", 1000); // promjeniti button_undefined za brisanje?
    

    cy.get(".styles__TableStyled-oksjky-0")
      .contains(text)
      .then(($btn) => {
        cy.get("[data-cy=tooltip_button_undefined]")
        .wait(1000)
        .click();
      })

    cy.getWaitClick(".mbsc-fr-btn1", 1000); // dodati bolji identifier?

    cy.errorToastVisible("The holiday has been successfully modified"); // "Praznik je uspješno izmjenjen"

    // neradni dan uspjesno obrisan  

  });

});
