describe('Admin Classroom page', () => {
  beforeEach(() => {
    cy.visit(`/sign-in`)
    cy.clerkLoaded()

    cy.clerkSignIn({
      strategy: 'password',
      identifier: Cypress.env('TEST_EMAIL'),
      password: Cypress.env('TEST_PASSWORD')
    })

    cy.visit('/dashboard', {
      failOnStatusCode: false,
      onBeforeLoad: win => {
        win.localStorage.setItem('videoWatched', 'true')
      }
    })
  })

  it('Should create classroom', () => {
    cy.intercept('/api/classroom', { statusCode: 200 }).as('createClassroom')

    cy.visit('/admin/classroom?tabSelected=classroom', {
      failOnStatusCode: false
    })

    cy.get('[data-testid="new-classroom"]', { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true })

    cy.get('[data-testid="title"]', { timeout: 15000 }).type('A base')
    cy.get('[data-testid="PerfilFechado"]').click()
    cy.get('[data-testid="submit"]').click({ force: true })

    cy.wait('@createClassroom')

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
    cy.get('[data-testid="...0_actions"]', { timeout: 20000 })
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true })
    cy.contains('Update', { timeout: 20000 }).click({ force: true })
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
    cy.get('[data-testid="...0_actions"]', { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true })

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
    cy.get('[data-testid="0"]').click()
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
    cy.get('[data-testid="...0_actions"]', { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true })
    cy.contains('Update').click()
    cy.get('[data-testid="title"]').clear().type('Fundamentos')
    cy.get('[data-testid="classroom"]').click()
    cy.get('[data-testid="0"]').click()

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
    cy.get('[data-testid="...0_actions"]', { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true })
    cy.contains('Delete').click()
    cy.contains('Delete').click()

    cy.contains('Success').should('exist')
    cy.contains('Module deleted successfully').should('exist')
  })
})
