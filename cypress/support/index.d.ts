// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    
    /**
     * gets Toastify__toast and checks if desired message is displayed
     * @param message desired message to be in toast pop-up
     * 
     * @example cy.errorToastVisible('Ime je obavezan podatak');
     */
    errorToastVisible(message: string): Chainable<Element>;

    /**
    * combines get, wait and click commands
    * @param name name of the selector criteria
    * @param waitTime time for the wait() command
    * 
    * @example  cy.getWaitClick('[data-intercom-target="Sidebar-Settings"]', 1000);
    */
    getWaitClick(name: string, waitTime: number): Chainable<Element>; 

    /**
     * combines get, first, wait and click commands
     * @param name name of the selector criteria 
     * @param waitTime time for the wait() command
     * 
     * @example cy.getFirstWaitClick("[data-cy=tooltip_button_undefined]", 1000);
     */
    getFirstWaitClick(name: string, waitTime: number): Chainable<Element>; 

    /**
     * returns the input with a ["data-cy=input_${name}"] selector criteria
     * @param name name of the input field
     */
    getInput(name: string): Chainable<Element>;

    /**
     * returns the button with a ["data-cy=button_${name}"] selector criteria
     * @param name name of the input field
     * 
     * @example cy.getButton("submit").click();
     */
    getButton(name: string): Chainable<Element>;

    /**
     * logs in using provided username and password vars
     * @param userName username with which to login
     * @param password password with which to login
     * 
     * @example  -> zasad korisrimo "rucno" jer vise provjeravamo; to "prebaciti" u ovu fja i dokumentirati
     */
    login(userName?: string, password?: string): Chainable<Element>;

    /**
     * iterates through a dropdown menu and checks the values
     * returns specified value
     * @param parent DOM that shows the list on click
     * @param item list of items to check
     * @param returnthis returns this index of list
     * 
     * @example cy.menuListItems('[data-cy=button]',listofitems,0)
     */
    menuListItems(parent: string, item: list, returnthis: int): Chainable<Element>;

    /**
    * returns a date in the following format: ned. 22. stu. 2020
    * @param futureDays date for how many days in the future to return
    * 
    * @example getFormatedDate(2);
    */
    getFormatedDate(futureDays: number);

    /**
    * returns true or false depending on wether today and today+futureDays are in the same month or not
    * @param futureDays date for how many days in the future to return
    * 
    * @example isSameMonth(10);
    */
    isSameMonth(futureDays: number);
  }
}
