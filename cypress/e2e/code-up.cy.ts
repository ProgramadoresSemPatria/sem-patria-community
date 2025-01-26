describe('Code Up page', () => {
  beforeEach(() => {
    cy.visit(`/sign-in`)
    cy.clerkLoaded()
    cy.clerkSignIn({
      strategy: 'password',
      identifier: Cypress.env('test_email'),
      password: Cypress.env('test_password')
    })

    cy.visit('/dashboard', {
      failOnStatusCode: false,
      onBeforeLoad: win => {
        win.localStorage.setItem('videoWatched', 'true')
      }
    })
  })
  it('Should create a note', () => {
    cy.intercept('/api/note', {
      statusCode: 200
    })
    cy.visit('/code-up', {
      failOnStatusCode: false
    })
    cy.intercept('api/note')
    cy.contains('Create a note').click()
    cy.contains('Success').should('exist')
    cy.contains('The note was created successfully').should('exist')
  })

  it('Should update a note', () => {
    cy.intercept('/api/note/**', {
      statusCode: 200
    })
    cy.intercept('api/note')
    cy.visit('/code-up', {
      failOnStatusCode: false
    })
    cy.get(':nth-child(1) > .flex > [data-testid="..."]').click()
    cy.contains('View Note').click()
    cy.get('[data-testid="title"]').type('Update test')
    cy.get('[data-testid="editor"] > .w-full')
      .clear()
      .type('Editing editor test')
    cy.contains('Editing editor test').should('exist')
    cy.contains('Save Changes').click()
    cy.contains('Success').should('exist')
    cy.contains('Your changes have been saved successfully').should('exist')
  })

  it('Should delete a note', () => {
    cy.intercept('/api/note/**', {
      statusCode: 200
    }).as('deleteNote')
    cy.visit('/code-up', {
      failOnStatusCode: false
    })
    cy.get(':nth-child(1) > .flex > [data-testid="..."]').click()
    cy.contains('Delete').click()
    cy.contains('Delete').click()
    cy.wait('@deleteNote').its('response.statusCode').should('eq', 200)
  })
})
