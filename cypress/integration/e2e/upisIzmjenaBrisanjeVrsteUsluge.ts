/// <reference types="cypress" />

export const module = 1;

describe("Owner can edit/create/delete type of service", () => {

    beforeEach(()=>{

        cy.visit("/login");

        cy.get('[data-cy=button_email]').click()

        cy.getInput("email")
        .type(Cypress.env("userName"))
        .should("have.value", Cypress.env("userName")); 
    
        cy.getInput("password")
            .type(Cypress.env("password"))
            .should("have.value", Cypress.env("password"));
        
        cy.get('[data-cy=button_submit]')

        cy.wait(3000)

        cy.get('[data-cy="Sidebar-Settings"]').click()

        cy.get('[data-intercom-target="Sidebar-Location-Services"]')
        .click()
    
        
    });

    it('Create/Edit/Delete type of service',() =>{

        // Dodavanje vrste usluge pod imenom 'Test-vrsta-usluge'

        cy.get('[data-cy=tooltip_button_btnAddService]').click()

        cy.get(':nth-child(1) > .style__InputWrapper-eewg3u-0 > .style__InputFieldWrapper-eewg3u-1 > [data-cy=input_undefined]')
        .type('Test-vrsta-usluge')

        cy.get('.Check__StyledIcon-m1vxvo-0').click()

        // Izmjena 'Test-vrsta-usluge' u ''

        cy.get('[data-cy=tooltip_button_btnEditService]').click()

        cy.get('.styles__ServicesLeftContent-sb82wm-27')
        .find('Test-vrsta-usluge')
        .click()
        .type('Test-vrsta-usluge-izmjenjeno')
    });

});