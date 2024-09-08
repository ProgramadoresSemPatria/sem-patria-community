describe('Admin Events page', () => {
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

  it('Should create event', () => {
    cy.intercept('/api/event', {
      statusCode: 200
    })
    cy.visit('/admin/events', {
      failOnStatusCode: false
    })
    cy.contains('New Event').click()
    cy.get('[data-testid="title"]').type('Live de boas vindas')
    cy.get('[data-testid="description"]').type(
      'Live de boas vindas, para os mentorados da base'
    )
    cy.get('[data-testid="location"]').type('zoom')
    cy.get('[data-testid="date"]').click()
    cy.get(':nth-child(5) > :nth-child(6) > .rdp-button_reset').click()
    cy.get('[data-testid="hour"]').click()
    cy.get('[data-testid="6"]').click()
    cy.get('[data-testid="minute"]').click()
    cy.get('[data-testid="5"]').click()
    cy.get('[data-testid="externalUrl"]').click()
    cy.get('[data-testid="externalUrlInput"]').type('https://zoom/event')
    cy.get('[data-testid="specialGuest"]').click()
    cy.get('[data-testid="specialGuestInput"]').type('Cleber')
    cy.get('[data-testid="submit"]').click()
    cy.contains('Success').should('exist')
    cy.contains('Event created successfully').should('exist')
  })

  it('Should delete event', () => {
    cy.intercept('/api/event/**', {
      statusCode: 200
    })
    cy.visit('/admin/events', {
      failOnStatusCode: false
    })
    cy.get('[data-testid="..."]').type('Front End')
    cy.contains('Delete').click()
    cy.contains('Delete').click()
    cy.contains('Success').should('exist')
    cy.contains('The event has been deleted successfully.').should('exist')
  })

  it('Should update event', () => {
    cy.intercept('/api/event/**', {
      statusCode: 200
    })
    cy.visit('/admin/events', {
      failOnStatusCode: false
    })
    cy.get('[data-testid="..."]').click()
    cy.contains('Update').click()
    cy.get('[data-testid="title"]').clear().type('Live de boas vindas')
    cy.get('[data-testid="description"]')
      .clear()
      .type('Live de boas vindas, para os mentorados da base')
    cy.get('[data-testid="location"]').clear().type('zoom')
    cy.get('[data-testid="date"]').click()
    cy.get(':nth-child(5) > :nth-child(6) > .rdp-button_reset').click()
    cy.get('[data-testid="hour"]').click()
    cy.get('[data-testid="6"]').click()
    cy.get('[data-testid="minute"]').click()
    cy.get('[data-testid="5"]').click()
    cy.get('[data-testid="externalUrl"]').click()
    cy.get('[data-testid="externalUrlInput"]').type('https://zoom/event')
    cy.get('[data-testid="specialGuest"]').click()
    cy.get('[data-testid="submit"]').click()
    cy.contains('Success').should('exist')
    cy.contains('Event updated').should('exist')
  })

  it('Should thrown an error if name is empty', () => {
    cy.intercept('/api/event', {
      statusCode: 200
    })
    cy.visit('/admin/events', {
      failOnStatusCode: false
    })
    cy.contains('New Event').click()
    cy.get('[data-testid="submit"]').click()
    cy.contains('Name is required').should('exist')
    cy.contains('Description is required').should('exist')
    cy.contains('Location is required').should('exist')
  })
})
