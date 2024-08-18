import 'cypress-file-upload'

describe('Mentorship Page', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn()
    })
    cy.visit('/dashboard', {
      failOnStatusCode: false,
      onBeforeLoad: win => {
        win.localStorage.setItem('videoWatched', 'true')
      }
    })
  })
  it('Should go to /mentoship/id', () => {
    cy.visit('/mentorship', {
      failOnStatusCode: false
    })
    cy.get('[data-testid="nm"] > .false > .group-hover\\:opacity-80')
      .click()
      .then(() => {
        cy.url().should('match', /\/mentorship\/[0-9a-fA-F-]{36}$/)
      })
  })
  it('Should go to attachments tab and add attachment', () => {
    cy.visit('/mentorship', {
      failOnStatusCode: false
    })
    cy.intercept('/api/classroom/video/**', {
      statusCode: 200
    })
    cy.get('[data-testid="nm"] > .false > .group-hover\\:opacity-80')
      .click()
      .then(() => {
        cy.url().should('match', /\/mentorship\/[0-9a-fA-F-]{36}$/)
      })
    cy.get('[data-testid="attachments"]').click()
    cy.contains('Add Attachment').click()
    const filePath = 'advanced.jpg'
    cy.get('[data-testid="upload"]').attachFile(filePath, { force: true })
    cy.contains('Save').click()
    cy.contains('Video updated').should('exist')
  })

  it('Should create a comment in video', () => {
    cy.visit('/mentorship', {
      failOnStatusCode: false
    })
    cy.intercept('POST', '/api/comment/**', {
      statusCode: 200
    })
    cy.get('[data-testid="nm"] > .false > .group-hover\\:opacity-80')
      .click()
      .then(() => {
        cy.url().should('match', /\/mentorship\/[0-9a-fA-F-]{36}$/)
      })
    cy.get(
      '.space-y-2 > [data-testid="editor"] > .w-full > :nth-child(1) > .tiptap'
    ).type('TEsting comment cypress')
    cy.contains('Send').click()
  })

  it.only('Should like a comment', () => {
    cy.visit('/mentorship', {
      failOnStatusCode: false
    })
    cy.intercept('PUT', '/api/comment/like/**', {
      statusCode: 200
    }).as('like')
    cy.get('[data-testid="nm"] > .false > .group-hover\\:opacity-80')
      .click()
      .then(() => {
        cy.url().should('match', /\/mentorship\/[0-9a-fA-F-]{36}$/)
      })
    cy.get(':nth-child(1) > .w-fit > [data-testid="like"]').click()
    cy.get(':nth-child(1) > .w-fit > [data-testid="likes-count"]').should(
      'have.text',
      '1'
    )
  })

  it('Should delete a comment', () => {
    cy.visit('/mentorship', {
      failOnStatusCode: false
    })
    cy.intercept('PUT', '/api/comment/like/**', {
      statusCode: 200
    })
    cy.get('[data-testid="nm"] > .false > .group-hover\\:opacity-80')
      .click()
      .then(() => {
        cy.url().should('match', /\/mentorship\/[0-9a-fA-F-]{36}$/)
      })
    cy.get(':nth-child(1) > .w-fit > [data-testid="like"]').click()
  })
})
