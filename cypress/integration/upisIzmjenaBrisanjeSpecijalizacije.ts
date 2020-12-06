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

    });
});