/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {

        cy.visit('https://narucime-dev.azurewebsites.net/login')
        cy.get('[data-cy=button_phone]').first().click()
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

        cy.get('[data-cy=input_firstName]').type('TestIme')

        cy.get('[data-cy=input_lastName]').type('TestPrezime')

        cy.get('[data-cy=input_email]').type('testmail@mail.hr')

        cy.get('[data-cy=input_gender]').click()


        cy.get('.react-select__menu-list').should('be.visible')
        .contains('Ženski').click()

        cy.get('[data-cy=input_gender]').click()
        cy.get('.react-select__menu-list').should('be.visible')
        .contains('Muški').click()

        cy.get('[data-cy=input_gender]').click()
        cy.get('.react-select__menu-list').should('be.visible')
        .contains('Ne želim upisati').click()
        

        cy.get('[data-cy=input_role]').click()

      })








})