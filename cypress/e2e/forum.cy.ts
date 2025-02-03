describe('Forum page', () => {
  beforeEach(() => {
    cy.visit(`/sign-in`)
    cy.clerkLoaded()
    cy.clerkSignIn({
      strategy: 'password',
      identifier: Cypress.env('TEST_EMAIL'),
      password: Cypress.env('TEST_PASSWORD')
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
    cy.get('[data-testid="create-post-modal"]').click()
    cy.get('[data-testid="category"]').click()
    cy.get('[data-testid="0"]').click({ force: true })
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
    cy.get('[data-testid="1"]').click()
    cy.get('[data-testid="select-category"] > .inline-flex').should(
      'not.have.text',
      'All'
    )
    cy.url().should('not.eq', 'http://localhost:3000/forum?category=All')
  })

  it('Should go to post page', () => {
    cy.get('[data-testid="post1"]').click({
      force: true
    })
    cy.url().should('match', /http:\/\/localhost:3000\/forum\/.*/)
  })

  it.only('Should like post', () => {
    cy.intercept('POST', '/api/post/**/likes', {
      statusCode: 200
    }).as('like')
    cy.get('[data-testid="like-count1"]')
      .invoke('text')
      .then(text => {
        const initialCount = parseInt(text.trim(), 10)
        cy.get('[data-testid="like1"]').click()
        cy.get('[data-testid="like-count1"]').should(
          'have.text',
          (initialCount + 1).toString()
        )
      })
  })
})
