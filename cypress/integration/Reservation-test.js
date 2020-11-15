
    

// https://narucime-dev.azurewebsites.net/login
 
/// <reference types="cypress" />

var emailLoginSwitch=false
var reservationdate
 
context('Actions', () => {
    beforeEach(() => {

      if(emailLoginSwitch){
        cy.visit('https://narucime-dev.azurewebsites.net/login')
        cy.get(':nth-child(2) > .styles__FieldColumn-sc-1cf5le3-16 > [data-cy=button_phone]').click()
        cy.get('[data-cy=input_email]').type('fran1saban+boris@gmail.com')
        cy.get('[data-cy=input_password]').type('jedan234')
        cy.get(':nth-child(4) > .styles__FieldColumn-sc-1cf5le3-16').click()
      }
      else{
        cy.visit('https://narucime-dev.azurewebsites.net/login')
        cy.get(':nth-child(2) > .styles__FieldColumn-sc-1cf5le3-16 > [data-cy=button_phone]').click()
        cy.get('[data-cy=input_email]').type('fran1saban+ivan@gmail.com')
        cy.get('[data-cy=input_password]').type('jedan234')
        cy.get(':nth-child(4) > .styles__FieldColumn-sc-1cf5le3-16').click()
      };
      

      //cy.login('fran1saban+boris@gmail.com','jedan234')
    })
  
    // https://on.cypress.io/interacting-with-elements
    
    it('Reservation',()=>{
      
      cy.get('[data-cy=CypressTest] > .location__DesktopLocationsLink-zewbbj-4 > .location__DesktopLocationImage-zewbbj-6').click()
      cy.wait(3000)
      cy.get('[data-cy=button_newBookingRequest]').click()

      cy.wait(1000)
      
      // cy.get('.ArrowLeft__StyledIcon-qst3h5-0').click()
      
    
      // cy.get('[data-cy="osnovna usluga"]').click()
      // cy.get('[data-cy=button_nextStep]').click()

      
  
      cy.get('[data-cy=employee_null]').click()

      cy.get('.styles__WizardEmployeeCenter-vntfsx-39').then((container)=>{
        if (container.find('p:contains(Nema slobodnih termina za)')){
          cy.get('[data-cy=button_undefined]').click()
        }
      })
      cy.get('.styles__WizardTimesWrapper-vntfsx-65 > :nth-child(1)').click()

      cy.get('[data-cy=input_comment]').type('Test run')

      cy.get('.styles__WizardConfirmTime-vntfsx-71').then(($dateandtime)=>{
        console.log($dateandtime.text())

        var temp=$dateandtime.text()

        reservationdate=temp.split(',')

      })

      cy.get('[data-cy=button_nextStep]').click()
      emailLoginSwitch=true
    })

    it('Reservation check',()=>{
      cy.get('[data-intercom-target="Sidebar-Reservations"] > .styles__SidebarIconWrapper-sc-1tu1um7-14')
      .click()
      cy.wait(2000)
      cy.get('.styles__TableStyled-oksjky-0').then((container)=>{
        container.find(`span:contains ${reservationdate[0]}`).parentsUntil('.table')

      })
    })

})
