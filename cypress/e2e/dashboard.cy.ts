describe('Dashboard/Nav bars (Topbar/MainNav)', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn()
    })
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('On Boarding Video')
    cy.contains('Mark as Watched').click()
    cy.contains('Dashboard')
  })

  it('Should go to the /courses page by clicking the Courses button in the sidebar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('[href="/courses?category=all"]')
      .click()
      .then(() => {
        cy.contains('Courses')
        cy.contains('All')
      })
  })

  it('Should go to the /code-up page by clicking the Courses button in the sidebar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('[href="/code-up"]')
      .click()
      .then(() => {
        cy.contains('Code Up')
        cy.contains('Create a note')
      })
  })

  it('Should go to the /settings page by clicking the Settings button in the sidebar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('[href="/profile"]')
      .click()
      .then(() => {
        cy.contains('Profile')
        cy.contains('Members of community')
      })
  })

  it('Should go to the /users page by clicking the Users button in the sidebar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('Users')
      .click()
      .then(() => {
        cy.contains('Users')
        cy.contains('New User')
      })
  })

  it('Should go to the /admin/courses page', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('[href="/admin/courses"]')
      .click()
      .then(() => {
        cy.contains('Courses')
        cy.contains('Add New')
      })
  })

  it('Should go to the /admin/categories page', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('[href="/admin/categories"]')
      .click()
      .then(() => {
        cy.contains('Categories')
        cy.contains('Add New')
      })
  })

  it('Should go to the /admin/events page', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('[href="/admin/events"]')
      .click()
      .then(() => {
        cy.contains('Community Events')
        cy.contains('New Event')
      })
  })

  it('Should go to the /admin/classroom page', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('[href="/admin/classroom?tabSelected=classroom"]')
      .click()
      .then(() => {
        cy.contains('Classroom')
        cy.contains('New Classroom')
      })
  })

  it('Should go to the /admin/classroom page in Modules tab', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('[href="/admin/classroom?tabSelected=classroom"]')
      .click()
      .then(() => {
        cy.contains('Classroom')
        cy.contains('New Classroom')
      })
    cy.get('[data-testid="modules"]')
      .click()
      .then(() => {
        cy.contains('New Module')
      })
  })

  it('Should go to the /admin/classroom page in Videos tab', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('[href="/admin/classroom?tabSelected=classroom"]')
      .click()
      .then(() => {
        cy.contains('Classroom')
        cy.contains('New Classroom')
      })
    cy.get('[data-testid="videos"]')
      .click()
      .then(() => {
        cy.contains('New Video')
      })
  })

  it('Should go to the dashboard', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('Dashboard')
    cy.contains('Recent notes of our members')
    cy.contains('Next events of the community')
    cy.contains('127 days challenge')
    cy.contains('Next events of the community')
  })

  it('Should go to the forum clicking in Share something', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('Share something')
      .click()
      .then(() => {
        cy.url().should('eq', 'http://localhost:3000/forum?category=All')
      })
  })

  it('Should open calendar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('#date')
      .click()
      .then(() => {
        cy.get('.rdp').should('exist')
      })
  })

  it('Should go to profile checklist when click in See more', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('See more')
      .click()
      .then(() => {
        cy.url().should('eq', 'http://localhost:3000/profile/checklist')
      })
  })

  it('Should preview note if exists', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })

    cy.get('body').then(body => {
      if (body.find('[style="min-width: 100%; display: table;"]').length) {
        cy.get('[style="min-width: 100%; display: table;"] > .p-6').then(() => {
          cy.get('.flex-1 > .flex > .inline-flex')
            .click()
            .then(() => {
              cy.contains('View full note').should('exist')
            })
        })
      } else {
        cy.log('Element does not exist')
      }
    })
  })
})
