describe('Admin Users page', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn()
    })
    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    cy.contains('CMS Mode').click()
  })
  it('Should hide filters when it is clicked', () => {
    cy.visit('/admin/users', {
      failOnStatusCode: false
    })
    cy.contains('Columns').click()
    cy.contains('email').click()
    cy.contains('Email').should('not.exist')
  })

  it('Should delete an user', () => {
    cy.intercept('/api/user/**', {
      statusCode: 200
    })
    cy.visit('/admin/users', {
      failOnStatusCode: false
    })
    cy.get('#radix-\\:R5lbnnlttfekq\\:').click()
    cy.contains('Delete').click()
    cy.contains('Delete').click().wait(1000)
    cy.contains('Success')
    cy.contains('The user has been deleted successfully')
  })

  it('Should create  an user', () => {
    cy.intercept('/api/user', {
      statusCode: 200
    })
    cy.visit('/admin/users', {
      failOnStatusCode: false
    })
    cy.contains('New User').click()
    cy.get('#\\:ri\\:-form-item').type('John Doe') // name
    cy.get('#\\:rj\\:-form-item').type('johndoe') // username
    cy.get('#\\:rk\\:-form-item').type('johndoe@gmail.com') // email
    cy.get('#\\:rl\\:-form-item').click()
    cy.get('select[aria-hidden="true"]:eq(0)').select('junior', { force: true }) // levels
    cy.get('#\\:rn\\:-form-item').type('https://github.com/johndoe') // gthub
    cy.get('#\\:ro\\:-form-item').type('https://linkedin.com/johndoe') // linkedin
    cy.get('#\\:rp\\:-form-item').type('@johndoe') // instagram
    cy.get('#\\:rq\\:-form-item').click() // roles
    cy.get(':nth-child(1) > .peer').click()
    cy.get(':nth-child(2) > .peer').click()
    cy.get(':nth-child(4) > .peer').click()
    cy.get(':nth-child(5) > .peer').click()
    cy.get('.space-y-8 > .justify-center').click({ force: true })
    cy.contains('Success')
    cy.contains('User created successfully')
  })

  it('Should throw an warining if do not have name', () => {
    cy.visit('/admin/users', {
      failOnStatusCode: false
    })
    cy.contains('New User').click()
    cy.get('.space-y-8 > .justify-center').click({ force: true })
    cy.contains('Name is required').should('exist')
  })

  it('Should throw an warining if do not have email', () => {
    cy.visit('/admin/users', {
      failOnStatusCode: false
    })
    cy.contains('New User').click()
    cy.get('#\\:ri\\:-form-item').type('John Doe') // name
    cy.get('.space-y-8 > .justify-center').click({ force: true })
    cy.contains('Invalid email').should('exist')
  })

  // it.only('Should update an user', () => {
  //   cy.visit('/admin/users', {
  //     failOnStatusCode: false
  //   })
  //   cy.get('#radix-\\:R5lbnnlttfekq\\:').click()
  //   cy.contains('Update').click()
  // })
})
