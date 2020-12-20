/// <reference types="cypress" />

export const module = 1;

describe("Demonstrate how to mock the server data", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    //cy.setLocalStorage("token", "whatever");
    cy.fixture("apiResponse/mockApi").then((mockData) =>
      cy.intercept({ pathname: "/graph", method: "POST" }, (req) => {
        req.reply(mockData[req.body.operationName]);
      })
    );
  });
  it("Displays the location list available to signed user", () => {
    cy.visit("/client/*/mylocations");
  });
});
