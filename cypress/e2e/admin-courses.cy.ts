describe('Admin Courses page', () => {
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
    cy.visit('/admin/courses', {
      failOnStatusCode: false
    })
    cy.contains('Columns').click()
    cy.contains('isPaid').click()
    cy.contains('Paid').should('not.exist')
  })

  it('Should sort courses by Level', () => {
    cy.visit('/admin/courses', {
      failOnStatusCode: false
    })
    cy.get(
      '.\\[\\&_tr\\]\\:border-b > .border-b > :nth-child(4) > .inline-flex'
    )
      .dblclick({ force: true })
      .wait(4000)

    cy.get(
      '.\\[\\&_tr\\:last-child\\]\\:border-0 > :nth-child(1) > :nth-child(4) > .inline-flex'
    ).should('contain.text', 'advanced')

    cy.get(
      '.\\[\\&_tr\\]\\:border-b > .border-b > :nth-child(4) > .inline-flex'
    ).click({ force: true })
    cy.get(
      '.\\[\\&_tr\\:last-child\\]\\:border-0 > :nth-child(1) > :nth-child(4) > .inline-flex'
    ).should('contain.text', 'beginner')
  })

  it('Should delete new course', () => {
    cy.intercept('/api/course/**', {
      statusCode: 200
    })
    cy.visit('/admin/courses', {
      failOnStatusCode: false
    })
    cy.get('#radix-\\:R2ulqnnlttfekq\\:').click()
    cy.contains('Delete').click()
    cy.contains('Delete').click()
    cy.contains('Success').should('exist')
    cy.contains('Course deleted successfully').should('exist')
  })

  it('Should update course', () => {
    cy.intercept('/api/course/**', {
      statusCode: 200
    })
    cy.visit('/admin/courses', {
      failOnStatusCode: false
    })
    cy.get('#radix-\\:R2ulqnnlttfekq\\:').click()
    cy.contains('Update').click()
    cy.get('#\\:rl\\:-form-item').clear().type('advancedddd')
    cy.get('#\\:rm\\:-form-item')
      .clear()
      .type('https://youtube.com/bordless-community')
    cy.get('#\\:rn\\:-form-item').click()
    cy.get('[aria-labelledby="radix-\\:r14\\:"]').click()
    cy.get('#\\:rp\\:-form-item').click()
    cy.get('[aria-labelledby="radix-\\:r18\\:"]').click()
    cy.get('#\\:rr\\:-form-item').click({ force: true })
    cy.get('.space-y-8 > .inline-flex').click()
    cy.contains('Success').should('exist')
    cy.contains('Course updated').should('exist')
  })

  it('Should create course', () => {
    cy.intercept('/api/course', {
      statusCode: 200
    })
    cy.visit('/admin/courses', {
      failOnStatusCode: false
    })
    cy.contains('Add New').click()
    cy.get('#\\:rl\\:-form-item').type('Graph QL')
    cy.get('#\\:rm\\:-form-item').type('https://youtube/graphql')
    cy.get('#\\:rn\\:-form-item').click()
    cy.get('[aria-labelledby="radix-\\:r14\\:"]').click()
    cy.get('#\\:rp\\:-form-item').click()
    cy.get('[aria-labelledby="radix-\\:r18\\:"]').click()
    cy.get('#\\:rr\\:-form-item').click()
    cy.get('.space-y-8 > .inline-flex').click()
    cy.contains('Success').should('exist')
    cy.contains('Course created successfully').should('exist')
  })
})
