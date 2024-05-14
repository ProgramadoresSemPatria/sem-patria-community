describe('Mentorship Page', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn()
    })
  })
  it('Should go to /mentoship/a-base', () => {
    cy.visit('/mentorship', {
      failOnStatusCode: false
    })
    cy.get('[href="/mentorship/a-base"]')
      .click()
      .then(() => {
        cy.url().should('eq', 'http://localhost:3000/mentorship/a-base')
      })
  })

  it('Should go to /mentoship/psp', () => {
    cy.visit('/mentorship', {
      failOnStatusCode: false
    })
    cy.get('[href="/mentorship/psp"]')
      .click()
      .then(() => {
        cy.url().should('eq', 'http://localhost:3000/mentorship/psp')
      })
  })
})
