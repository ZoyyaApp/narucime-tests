/// <reference types="cypress" />

export const module = 1;

describe('Test Upisa/Izmjene/Brisanja Specijalizacije', ()=>{

    beforeEach(()=>{

        cy.visit('https://narucime-dev.azurewebsites.net/login');
        cy.get('[data-cy=button_email]').click();
        cy.get('[data-cy=input_email]').type('fran1saban+boris@gmail.com');
        cy.get('[data-cy=input_password]').type('jedan234');

        cy.get('[data-cy=button_submit]').click();
        cy.get('[data-intercom-target="Sidebar-Settings"]').click();

        //Stranica se zna srusiti prilikom doljnje click() komande 

        cy.get('[data-intercom-target="Sidebar-Location-Professions"]').click();
    })

    it('Upis specijalizacije',()=>{
        cy.get('[data-cy=button_undefined]').click();
        cy.get('[data-cy=input_name]').type('Test specijalizacija');
        cy.get('[data-cy=button_saveChanges]').click();
        cy.get('.styles__TableStyled-oksjky-0').should('contain','Test specijalizacija')
    });

    it('Izmjena specijalizacije',()=>{
        cy.get('.styles__TableStyled-oksjky-0')
        .contains('Test specijalizacija')
        .click()

        cy.get('[data-cy=input_name]')
        .clear()
        .type('Izmjenjena specijalizacija');

        cy.get('[data-cy=button_saveChanges]').click();
        cy.get('.styles__TableStyled-oksjky-0').should('contain','Izmjenjena specijalizacija')
    })
    it('Brisanje specijalizacije', () => {
        cy.get('.styles__TableStyled-oksjky-0').contains('Izmjenjena specijalizacija')
        .parentsUntil('[role=rowgroup]')
        .find('.Button__ButtonStyled-sc-1rk4a6g-0').click()

        cy.wait(200)

        cy.get('.mbsc-fr-btn1').click()
    });
});