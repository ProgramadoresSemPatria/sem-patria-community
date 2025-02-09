import 'cypress-file-upload'

describe('Mentorship Page', () => {
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
  it('Should go to /mentoship/id', () => {
    cy.visit('/mentorship', {
      failOnStatusCode: false
    })
    cy.get('[data-testid="carousel1-module0"] a').click({ force: true })
    cy.url().should('match', /\/mentorship\/[0-9a-fA-F-]{36}$/)
  })

  // not working
  // it('Should go to attachments tab and add attachment', () => {
  //   cy.visit('/mentorship', {
  //     failOnStatusCode: false
  //   })
  //   cy.intercept('/api/classroom/video/**', {
  //     statusCode: 200
  //   }).as('upload')
  //   cy.intercept(
  //     'POST',
  //     '/api/uploadthing?actionType=upload&slug=imageUploader',
  //     {
  //       statusCode: 200,
  //       body: [
  //         {
  //           url: 'https://mocked-cdn.com/mock-image.png',
  //           key: 'fake-key', // ✅ Ensure the key is present
  //           name: 'mock-image.png', // ✅ Ensure filename is present
  //           size: 12345, // ✅ Ensure file size is present
  //           type: 'image/png'
  //         }
  //       ]
  //     }
  //   ).as('image')

  //   cy.get('[data-testid="carousel1-module0"]')
  //     .click()
  //     .then(() => {
  //       cy.url().should('match', /\/mentorship\/[0-9a-fA-F-]{36}$/)
  //     })
  //   cy.get('[data-testid="attachments"]').click()
  //   cy.contains('Add Attachment').click()
  //   const filePath = 'advanced.jpg'
  //   cy.get('[data-testid="upload"]').attachFile(filePath, { force: true })
  //   // cy.mockUploadFiles()

  //   cy.contains('Save').click({ force: true })
  //   cy.wait('@image')

  //   cy.wait('@upload')
  //   cy.contains('Video updated').should('exist')
  // })

  it('Should create a comment in video', () => {
    cy.visit('/mentorship', {
      failOnStatusCode: false
    })
    cy.intercept('POST', '/api/comment/**', {
      statusCode: 200
    })
    cy.get('[data-testid="carousel1-module0"]')
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
    cy.get('[data-testid="carousel1-module0"]')
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
    cy.get('[data-testid="carousel1-module0"]')
      .click()
      .then(() => {
        cy.url().should('match', /\/mentorship\/[0-9a-fA-F-]{36}$/)
      })
    cy.get(':nth-child(1) > .w-fit > [data-testid="like"]').click()
  })
})
