describe('Dashboard', () => {
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
})
