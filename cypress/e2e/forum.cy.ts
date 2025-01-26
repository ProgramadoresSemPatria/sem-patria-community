describe('Forum page', () => {
  beforeEach(() => {
    cy.visit(`/sign-in`)
    cy.clerkLoaded()
    cy.clerkSignIn({
      strategy: 'password',
      identifier: Cypress.env('test_email'),
      password: Cypress.env('test_password')
    })
    cy.visit('/forum?category=All', {
      failOnStatusCode: false,
      onBeforeLoad: win => {
        win.localStorage.setItem('videoWatched', 'true')
      }
    })
  })
  it('Should create a post', () => {
    cy.intercept('/api/post', {
      statusCode: 200
    }).as('create')
    cy.get('.outline-none').click()
    cy.get('[data-testid="category"]').click()
    cy.get('[data-testid="Back End"]').click({ force: true })
    cy.get('[data-testid="title"]').type('Cypress post')
    cy.get('.is-empty').type('Cypress post content')
    cy.contains('Send').click()
    cy.wait('@create').its('response.statusCode').should('eq', 200)
  })

  it('Should go to other category url', () => {
    cy.intercept('/api/post', {
      statusCode: 200
    }).as('create')
    cy.get('[data-testid="select-category"]').click({ force: true })
    cy.get('[data-value="back end"]').click()
    cy.get('[data-testid="select-category"] > .inline-flex').should(
      'have.text',
      'Back End'
    )
    cy.url().should('eq', 'http://localhost:3000/forum?category=Back%20End')
  })

  it('Should go to post page', () => {
    cy.get('.col-span-2 > :nth-child(1) > [data-testid="postt"]').click({
      force: true
    })
    cy.url().should('match', /http:\/\/localhost:3000\/forum\/.*/)
  })

  it('Should like post', () => {
    cy.intercept('api/post/**/likes', {
      statusCode: 200
    }).as('like')
    cy.get(
      '.col-span-2 > :nth-child(1) > .p-2 > .ml-2 > [data-testid="like"]'
    ).click()
    cy.get(
      '.col-span-2 > :nth-child(1) > .p-2 > .ml-2 > [data-testid="like"] > [data-testid="like-count"]'
    ).should('have.text', 1)
  })
})
