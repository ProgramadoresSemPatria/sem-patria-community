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
})
