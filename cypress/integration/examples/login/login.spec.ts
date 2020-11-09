/// <reference types="cypress" />

export const module = 1;

describe("User can login", () => {
  it("Fill the login form and submit with enter", () => {
    cy.visit("/login");

    cy.get("[data-cy=button_phone]").click();

    //example of custom commands usage. Custom commands are defined in the support/commands.js. The typescript typings for custom commands are defined in the support/index.d.ts file.
    cy.getInput("userName").type(Cypress.env("userName"));
    cy.getInput("password").type(Cypress.env("password"));
    cy.getButton("submit").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.contains("/calendar/day");
    });
  });
});
