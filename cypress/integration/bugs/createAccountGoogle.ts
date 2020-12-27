/// <reference types="cypress" />

export const module = 1;

describe("Try to create an account uning Google login", () => {

    it('Create account using Google',() =>{

        cy.visit("/signup");

        cy.get(":nth-child(1) > [data-cy=button_undefined]")
          .click()
          .wait(1000);

    });

});