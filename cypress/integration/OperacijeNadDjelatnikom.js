/// <reference types="cypress" />


var name = 'TestIme'
var surname = 'TestPrezime'
var mail = 'testmail@mail.hr'

context('Actions', () => {
    beforeEach(() => {

        cy.visit('https://narucime-dev.azurewebsites.net/login')
        cy.get('[data-cy=button_email]').click()
        cy.get('[data-cy=input_email]').type('fran1saban+boris@gmail.com')
        cy.get('[data-cy=input_password]').type('jedan234')

        cy.get('[data-cy=button_submit]').click()
        cy.get('[data-intercom-target="Sidebar-Settings"]').click()
        cy.get('[href="/bnenl/115/settings/organization/locations/115/employees"]').click()
      
      })

      it('Dodavanje Djelatnika',()=>{
        cy.get('[data-cy=button_addEmployee]',).click()

        cy.get('[data-cy=button_saveChanges]').click()

        cy.errorToastVisible('Ime je obavezan podatak')
        cy.errorToastVisible('Prezime je obavezan podatak')
        cy.errorToastVisible('Ovlaštenje je obavezan podatak')
        cy.errorToastVisible('Spol je obavezan podatak')

        cy.wait(1000)

        cy.get('[data-cy=input_firstName]').type(name)

        cy.get('[data-cy=input_lastName]').type(surname)

        cy.get('[data-cy=input_email]').type(mail)

        cy.get('[data-cy=input_gender]').click()

        cy.menuListItems('Ženski')
        .click()

        cy.get('[data-cy=input_gender]').click()

        cy.menuListItems('Muški')
        .click()
        
        cy.get('[data-cy=input_gender]').click()

        cy.menuListItems('Ne želim upisati')
        .click()


        cy.get('[data-cy=input_role]').click()

        cy.menuListItems('Vlasnik')
        .click()

        cy.get('[data-cy=input_role]').click()

        cy.menuListItems('Korisnik')
        .click()

        cy.get('[data-cy=input_role]').click()

        cy.menuListItems('Administrator')
        .click()

        cy.get('[data-cy=button_saveChanges]').click()

        cy.get('.styles__TableStyled-oksjky-0').contains(name+' '+surname)
      })








})