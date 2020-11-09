# Naruci.me cypress test repository

## Prerequisites

- Some code editor (Vs Code or similar)
- Usual dev machine config (NodeJs, Git tool installed)
- Yarn tool installed, if you don't have it:

  `npm install -g yarn`

## Getting started

1. Clone the repository

   `git clone https://github.com/lemonmints/narucime-tests`

2. Open the repo folder in your code editor and install dependencies

   `yarn install`

   Cypress installation could take a while, be patient.

3. Add a local cypress.env.json file in the repository root

   This file contains all cypress environment variables as explained [here](https://docs.cypress.io/guides/guides/environment-variables.html#Option-2-cypress-env-json).

   ```json
   {
     "userName": "naruci.me user name",
     "password": "naruci.me password"
   }
   ```

   File is git ignored, every developer should create a new local file.

## Open cypress runner

    yarn cy

cy is a script command (`cypress open`) defined in package.json

## Write some tests and enjoy
