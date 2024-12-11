// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import dotenv from 'dotenv'

dotenv.config()

Cypress.Commands.add('loginAndGoToHomepage', () => {
  const email = Cypress.env('VITE_CYPRESS_EMAIL')
  const password = Cypress.env('VITE_CYPRESS_PASSWORD')
  cy.visit('/login')
  cy.get('[data-cy="email-input"]').type(email)
  cy.get('[data-cy="password-input"]').type(password)
  cy.get('input[type="submit"]').should('be.visible').click()

  cy.url().should('include', '/')
  cy.get('[data-cy="header__title-welcome"]').contains('Welcome to tasker')
})
