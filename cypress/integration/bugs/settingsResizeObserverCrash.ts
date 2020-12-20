/// <reference types="cypress" />

import { timers } from "cypress/types/jquery";

export const module = 1;

describe("Rušenje stranice kod djelatnika i Resize Observer bug", () => {

    it('Bug test', ()=>{
        cy.visit('https://narucime-dev.azurewebsites.net/login')
        cy.get('[data-cy=button_email]').click()
        cy.get('[data-cy=input_email]').type('fran1saban+boris@gmail.com')
        cy.get('[data-cy=input_password]').type('jedan234')

        cy.get('[data-cy=button_submit]').click()
        cy.get('[data-intercom-target="Sidebar-Reports"]').click()

        //Wait uzrokuje Resize observer bug
        

        cy.wait(1000);

        //Stranica se zna srusiti prilikom doljnje click() komande 

        cy.get('[href="/bnenl/115/settings/organization/locations/115/employees"]').click()
    });

});