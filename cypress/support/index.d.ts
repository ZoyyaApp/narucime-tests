// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    login(userName?: string, password?: string): Chainable<Element>;
    /**
     * returns the input with a ["data-cy=input_${name}"] selector criteria
     * @param name name of the input field
     */
    getInput(name: string): Chainable<Element>;

    /**
     * returns the button with a ["data-cy=button_${name}"] selector criteria
     * @param name name of the input field
     */
    getButton(name: string): Chainable<Element>;
    errorToastVisible(message: string): Chainable<Element>;
  }
}
