/// <reference types="cypress" />

const { createVoidZero } = require("typescript")


var name = 'TestIme'
var surname = 'TestPrezime'
var mail = 'testmail@mail.hr'

var name1 = 'IzmjenIme'
var surname1 = 'IzmjenPrezim'
var mail1 = 'izmjmail@mail.hr'
var address = 'neka adresa'

var item_list_gender=['Ženski','Muški','Ne želim upisati'];

var item_list_role=['Vlasnik','Korisnik','Administrator'];

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

      it('Dodavanje djelatnika',()=>{
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

        cy.menuListItems('[data-cy=input_gender]',item_list_gender,0).click()

        cy.menuListItems('[data-cy=input_role]',item_list_role,0).click()

        cy.get('[data-cy=button_saveChanges]').click()
        
        cy.wait(1000)

        cy.get('.styles__TableRow-qmnykg-42')
        .should('contain',name+' '+surname)
        .and('contain',mail)
      })

      it('Izmjena podataka djelatnika',()=>{

        cy.get('.styles__TableRow-qmnykg-42').last().click()

        cy.get('[data-cy=input_firstName]').clear().type(name1)

        cy.get('[data-cy=input_lastName]').clear().type(surname1)

        cy.get('[data-cy=input_email]').clear().type(mail1)

        cy.menuListItems('[data-cy=input_gender]',item_list_gender,1).click()

        cy.menuListItems('[data-cy=input_role]',item_list_role,1).click()

        cy.get('[data-cy=input_address]').type(address)

        cy.get('[data-cy=button_saveChanges]').click()

        cy.get('.styles__TableRow-qmnykg-42')
        .should('contain',name1+' '+surname1)
        .and('contain',mail1)

      })

      it('Brisanje djelatnika', ()=>{

        cy.get('.table').contains(name1+' '+surname1)
        .parentsUntil('[role=rowgroup]')
        .contains('button [data-cy=button_undefined]').click()
        

        // cy.get('.styles__TableRow-qmnykg-42')
        // .should('not.contain',name1+' '+surname1)
        // .and('not.contain',mail)
      })

})