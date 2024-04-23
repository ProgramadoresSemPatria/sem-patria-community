describe('Dashboard/Nav bars (Topbar/MainNav)', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn()
    })
  })
  it('Should change CMS Mode on button click', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('CMS Mode')
      .click()
      .then(() => {
        cy.contains('Member Mode')
        cy.contains('CMS')
      })
  })

  it('Should go to the /mentoship page by clicking the Mentorship button in the sidebar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('[href="/mentorship"] > .font-medium')
      .click()
      .then(() => {
        cy.contains('Mentorship')
        cy.contains('Browse all our community content.')
      })
  })

  it('Should go to the /courses page by clicking the Courses button in the sidebar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('[href="/courses?category=all"]')
      .click()
      .then(() => {
        cy.contains('Courses')
        cy.contains('Browse all our community content')
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
        cy.contains('Inform the progress of the day')
      })
  })

  it('Should go to the /settings page by clicking the Settings button in the sidebar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.get('[href="/settings"]')
      .click()
      .then(() => {
        cy.contains('Settings')
        cy.contains('Manage your account settings')
      })
  })

  it('Should go to the /users page by clicking the Users button in the sidebar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('CMS Mode').click()
    cy.contains('Users')
      .click()
      .then(() => {
        cy.contains('Users')
        cy.contains('Manage the community users here')
      })
  })

  it('Should go to the /admin/courses page by clicking the CMS Courses button in the sidebar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('CMS Mode').click()
    cy.get('[href="/admin/courses"]')
      .click()
      .then(() => {
        cy.contains('Courses')
        cy.contains('Manage the indications of courses of community.')
      })
  })

  it('Should go to the /admin/categories page by clicking the CMS Categories button in the sidebar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('CMS Mode').click()
    cy.get('[href="/admin/categories"]')
      .click()
      .then(() => {
        cy.contains('Categories')
        cy.contains('Manage the categories of courses')
      })
  })

  it('Should go to the /admin/events page by clicking the CMS Events button in the sidebar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('CMS Mode').click()
    cy.get('[href="/admin/events"]')
      .click()
      .then(() => {
        cy.contains('Community Events')
        cy.contains('Manage the community events here')
      })
  })

  it('Should go to the /admin/classroom page by clicking the CMS Classroom button in the sidebar', () => {
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('CMS Mode').click()
    cy.get('[href="/admin/events"]')
      .click()
      .then(() => {
        cy.contains('Classroom')
        cy.contains('Manage the community events here.')
      })
  })
})
