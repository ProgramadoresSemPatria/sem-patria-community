describe(' Reccomend courses', () => {
  beforeEach(() => {
    cy.visit(`/sign-in`)
    cy.clerkLoaded()

    cy.clerkSignIn({
      strategy: 'password',
      identifier: Cypress.env('TEST_EMAIL'),
      password: Cypress.env('TEST_PASSWORD')
    })
    cy.visit('/dashboard', {
      failOnStatusCode: false,
      onBeforeLoad: win => {
        win.localStorage.setItem('videoWatched', 'true')
      }
    })
  })

  it('Recomend a course', () => {
    cy.intercept('/api/course', {
      statusCode: 201
    })
    cy.get('[data-testid="recommendation"]').click()
    cy.get('[data-testid="name"]').type('New Course')
    cy.get('[data-testid="url"]').type(
      'https://www.youtube.com/watch?v=mSUKMfmLAt0&t=146s'
    )
    cy.get('[data-testid="trigger"]').click()
    cy.get('[data-testid="beginner"]').click()
    cy.get('[data-testid="isPaid"]').click()
    cy.get('[data-testid="create-category"]').click()
    cy.get('[data-testid="category-name"]').type('new category name')
    cy.get('[data-testid="submit"]').click({ force: true })
    cy.contains('Course created successfully.').should('exist')
  })

  it.only('Approve a course', () => {
    cy.intercept('GET', '/api/course', {
      statusCode: 200,
      body: [
        {
          id: '540ca94b-2d3a-445d-b7c6-612b43ef51c1',
          name: 'HTML e CSS do zero 🐥',
          courseUrl: 'https://www.youtube.com/watch?v=mSUKMfmLAt0&t=146s',
          level: 'beginner',
          categoryId: '078141d9-4986-44a9-8811-cd782cce52b2',
          isPaid: false,
          isPending: false,
          createdAt: '2024-07-16T19:21:42.860Z',
          updatedAt: '2024-07-17T19:06:12.866Z',
          categories: [
            {
              courseId: '540ca94b-2d3a-445d-b7c6-612b43ef51c1',
              categoryId: 'fabd15b1-9fcb-46f3-9df1-fcf6dd8a4812',
              category: {
                id: 'fabd15b1-9fcb-46f3-9df1-fcf6dd8a4812',
                name: 'Back End',
                createdAt: '2024-07-16T19:19:08.307Z',
                updatedAt: '2024-07-16T19:19:08.307Z'
              }
            },
            {
              courseId: '540ca94b-2d3a-445d-b7c6-612b43ef51c1',
              categoryId: 'e790ee41-bbe3-41e0-ae01-bacc2dc724f4',
              category: {
                id: 'e790ee41-bbe3-41e0-ae01-bacc2dc724f4',
                name: 'Front End',
                createdAt: '2024-07-16T19:19:12.697Z',
                updatedAt: '2024-07-16T19:19:12.697Z'
              }
            }
          ],
          category: {
            id: '078141d9-4986-44a9-8811-cd782cce52b2',
            name: 'web 3',
            createdAt: '2024-07-17T18:28:25.314Z',
            updatedAt: '2024-07-17T18:28:25.314Z'
          }
        },
        {
          id: 'c8c608f6-d217-4c85-8e53-e54fc55d9b4e',
          name: 'feb',
          courseUrl: 'https://www.youtube.com/watch?v=mSUKMfmLAt0&t=146s',
          level: 'intermediate',
          categoryId: '31cf7aa1-1e65-4c1d-9554-1808e4e86cb4',
          isPaid: false,
          isPending: false,
          createdAt: '2024-09-09T22:08:15.892Z',
          updatedAt: '2024-09-09T22:08:15.892Z',
          categories: [],
          category: {
            id: '31cf7aa1-1e65-4c1d-9554-1808e4e86cb4',
            name: 'IA',
            createdAt: '2024-07-17T18:28:33.616Z',
            updatedAt: '2024-07-17T18:28:33.616Z'
          }
        },
        {
          id: '0a96cf73-48cf-4cae-85be-3d0daa10c636',
          name: 'rdf',
          courseUrl: 'https://www.youtube.com/watch?v=gyMwXuJrbJQ',
          level: 'advanced',
          categoryId: 'fabd15b1-9fcb-46f3-9df1-fcf6dd8a4812',
          isPaid: false,
          isPending: true,
          createdAt: '2024-09-11T17:58:26.021Z',
          updatedAt: '2024-09-11T17:58:26.021Z',
          categories: [
            {
              courseId: '0a96cf73-48cf-4cae-85be-3d0daa10c636',
              categoryId: 'fabd15b1-9fcb-46f3-9df1-fcf6dd8a4812',
              category: {
                id: 'fabd15b1-9fcb-46f3-9df1-fcf6dd8a4812',
                name: 'Back End',
                createdAt: '2024-07-16T19:19:08.307Z',
                updatedAt: '2024-07-16T19:19:08.307Z'
              }
            }
          ],
          category: {
            id: 'fabd15b1-9fcb-46f3-9df1-fcf6dd8a4812',
            name: 'Back End',
            createdAt: '2024-07-16T19:19:08.307Z',
            updatedAt: '2024-07-16T19:19:08.307Z'
          }
        }
      ]
    }).as('getCourses')
    cy.intercept('/api/course', {
      statusCode: 201
    })
    cy.get('[href="/admin/courses"] > .font-medium').click()
    cy.wait('@getCourses')
    cy.contains('pending')
  })
})
