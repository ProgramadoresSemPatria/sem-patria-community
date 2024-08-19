/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface Window {
  Clerk: {
    isReady: () => boolean
    client: {
      signIn: {
        create: (options: {
          identifier: string
          password: string
        }) => Promise<{ createdSessionId: string }>
      }
    }
    setActive: (options: { session: string }) => Promise<void>
  }
}
declare namespace Cypress {
  interface Chainable {
    signIn(): Chainable<void>
    getByTestId(id: string): Chainable<void>
  }
}

Cypress.Commands.add(`signIn`, () => {
  cy.log(`Signing in.`)
  cy.visit('/', {
    failOnStatusCode: false
  })

  cy.window()
    .should(window => {
      expect(window).to.not.have.property(`Clerk`, undefined)
      expect(window.Clerk.isReady()).to.eq(true)
    })
    .then(window => {
      cy.clearCookies({ domain: window.location.hostname }).then(async () => {
        await window.Clerk.client.signIn
          .create({
            identifier: Cypress.env(`test_email`),
            password: Cypress.env(`test_password`)
          })
          .then(async res => {
            await window.Clerk.setActive({
              session: res.createdSessionId
            })
          })
      })
    })
})

Cypress.Commands.add('getByTestId', id => {
  cy.get(`[testid=${id}]`)
})

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', err => {
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false
  }
})
