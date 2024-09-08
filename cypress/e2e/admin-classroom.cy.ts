describe('Admin Classroom page', () => {
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

  it('Should create classroom', () => {
    cy.intercept('/api/classroom', {
      statusCode: 200
    })
    cy.visit('/admin/classroom?tabSelected=classroom', {
      failOnStatusCode: false
    })
    cy.get('[data-testid="new-classroom"]').click({ force: true })
    cy.get('[data-testid="title"]').type('A base')
    cy.get('[data-testid="PerfilFechado"]').click()
    cy.get('[data-testid="submit"]').click()

    cy.contains('Success').should('exist')
    cy.contains('Classroom created successfully').should('exist')
  })

  it('Should update classroom', () => {
    cy.intercept('/api/classroom/**', {
      statusCode: 200
    })
    cy.visit('/admin/classroom?tabSelected=classroom', {
      failOnStatusCode: false
    })
    cy.get(':nth-child(1) > :nth-child(5) > [data-testid="..."]').click({
      force: true
    })
    cy.contains('Update').click()
    cy.get('[data-testid="title"]').type('Test')
    cy.get('[data-testid="Base"]').click()
    cy.get('[data-testid="submit"]').click()

    cy.contains('Success').should('exist')
    cy.contains('Classroom updated').should('exist')
  })

  it('Should delete classroom', () => {
    cy.intercept('/api/classroom/**', {
      statusCode: 200
    })
    cy.visit('/admin/classroom?tabSelected=classroom', {
      failOnStatusCode: false
    })
    cy.get(':nth-child(1) > :nth-child(5) > [data-testid="..."]').click({
      force: true
    })
    cy.contains('Delete').click()
    cy.contains('Delete').click()

    cy.contains('Success').should('exist')
    cy.contains('Classroom deleted').should('exist')
  })

  it('Should create module', () => {
    cy.intercept('/api/classroom/module**', {
      statusCode: 200
    })
    cy.visit('/admin/classroom?tabSelected=classroom', {
      failOnStatusCode: false
    })
    cy.contains('Modules').click()
    cy.contains('New Module').click()

    cy.get('[data-testid="title"]').type('Module')
    cy.get('[data-testid="classroom"]').click()
    cy.get('[data-testid="nm "]').click()
    // TODO: test add files

    cy.get('[data-testid="submit"]').click()

    cy.contains('Success').should('exist')
    cy.contains('Module created successfully').should('exist')
  })

  it('Should update module', () => {
    cy.intercept('/api/classroom/module/**', {
      statusCode: 200
    })
    cy.visit('/admin/classroom?tabSelected=classroom', {
      failOnStatusCode: false
    })
    cy.contains('Modules').click()
    cy.get(':nth-child(1) > :nth-child(5) > [data-testid="..."]').click()
    cy.contains('Update').click()
    cy.get('[data-testid="title"]').clear().type('Fundamentos')
    cy.get('[data-testid="classroom"]').click()
    cy.get('[data-testid="reg"]').click()

    cy.get('[data-testid="submit"]').click()

    cy.contains('Success').should('exist')
    cy.contains('Module updated').should('exist')
  })

  it('Should delete module', () => {
    cy.intercept('/api/classroom/module/**', {
      statusCode: 200
    })
    cy.visit('/admin/classroom?tabSelected=classroom', {
      failOnStatusCode: false
    })
    cy.contains('Modules').click()
    cy.get(':nth-child(1) > :nth-child(5) > [data-testid="..."]').click()
    cy.contains('Delete').click()
    cy.contains('Delete').click()

    cy.contains('Success').should('exist')
    cy.contains('Module deleted successfully').should('exist')
  })
})
