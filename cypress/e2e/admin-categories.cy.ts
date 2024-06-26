describe('Admin Categories page', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn()
    })
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('CMS Mode').click()
  })

  it('Should create category', () => {
    cy.intercept('/api/category', {
      statusCode: 200
    })
    cy.visit('/admin/categories', {
      failOnStatusCode: false
    })
    cy.contains('Add New').click()
    cy.get('[data-testid="name"]').type('Front End')
    cy.get('[data-testid="submit"]').click()
    cy.contains('Success').should('exist')
    cy.contains('Category created successfully').should('exist')
  })

  it('Should delete category', () => {
    cy.intercept('/api/category/**', {
      statusCode: 200
    })
    cy.visit('/admin/categories', {
      failOnStatusCode: false
    })
    cy.get(':nth-child(1) > :nth-child(3) > [data-testid="..."]').click()
    cy.contains('Delete').click()
    cy.contains('Delete').click()
    cy.contains('Success').should('exist')
    cy.contains('Category deleted successfully').should('exist')
  })

  it('Should update category', () => {
    cy.intercept('/api/category/**', {
      statusCode: 200
    })
    cy.visit('/admin/categories', {
      failOnStatusCode: false
    })
    cy.get(':nth-child(1) > :nth-child(3) > [data-testid="..."]').click()
    cy.contains('Update').click()
    cy.get('[data-testid="name"]').clear().type('Back End')
    cy.get('[data-testid="submit"]').click()
    cy.contains('Success').should('exist')
    cy.contains('Category updated').should('exist')
  })
})
