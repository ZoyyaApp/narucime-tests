// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

import { List } from "cypress/types/lodash";

declare namespace Cypress {
  interface Chainable {
    getWaitClick(name: string, waitTime: number): Chainable<Element>; 
    getFirstWaitClick(name: string, waitTime: number): Chainable<Element>; 
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
    menuListItems(parent: string, item: list, returnthis: int): Chainable<Element>;
    /**
     * iterates through a dropdown menu and checks the values
     * returns specified value
     * @param parent DOM that shows the list on click
     * @param item list of items to check
     * @param returnthis returns this index of list
     * 
     * @example cy.menuListItems('[data-cy=button]',listofitems,0)
     */
  }
}
