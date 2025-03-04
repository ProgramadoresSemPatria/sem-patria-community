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
    cy.get('[data-testid="name"]').type('John Doe') // name
    cy.get('[data-testid="username"]').type('johndoe') // username
    cy.get('[data-testid="email"]').type('johndoe@gmail.com') // email
    cy.get('[data-testid="level"]').click()
    cy.get('[data-testid="junior"]').click({ force: true }) // levels
    cy.get('[data-testid="github"]').type('https://github.com/johndoe') // gthub
    cy.get('[data-testid="linkedin"]').type('https://linkedin.com/johndoe') // linkedin
    cy.get('[data-testid="instagram"]').type('@johndoe') // instagram
    cy.get('[data-testid="role"]').click() // roles
    cy.get('[data-testid="Admin"]').click()
    cy.get('[data-testid="submit"]').click({ force: true })
    cy.contains('Success')
    cy.contains('User created successfully')
  })

  it('Should throw an warining if do not have name', () => {
    cy.visit('/admin/users', {
      failOnStatusCode: false
    })
    cy.contains('New User').click()
    cy.get('[data-testid="submit"]').click({ force: true })
    cy.contains('Name is required').should('exist')
  })

  it('Should throw an warining if do not have email', () => {
    cy.visit('/admin/users', {
      failOnStatusCode: false
    })
    cy.contains('New User').click()
    cy.get('[data-testid="name"]').type('John Doe') // name
    cy.get('[data-testid="submit"]').click({ force: true })
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
