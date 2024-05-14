describe('Code Up page', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn()
    })
    cy.visit('/code-up', {
      failOnStatusCode: false
    })
  })
  it('Should create a note', () => {
    cy.intercept('/api/note', {
      statusCode: 200
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
    cy.get(':nth-child(1) > [data-testid="..."]').click()
    cy.contains('View Note').click()
    cy.get('[data-testid="title"]').type('Update test')
    cy.get('[data-testid="editor"]').type('Editing editor test')
    cy.contains('Editing editor test').should('exist')
    cy.contains('Save Changes').click()
    cy.contains('Success').should('exist')
    cy.contains('Your changes have been saved successfully').should('exist')
  })

  it.only('Should delete a note', () => {
    cy.intercept('/api/note/**', {
      statusCode: 200
    }).as('deleteNote')
    cy.get(':nth-child(1) > [data-testid="..."]').click()
    cy.contains('Delete').click()
    cy.contains('Delete').click()
    cy.wait('@deleteNote').its('response.statusCode').should('eq', 200)
  })
})
