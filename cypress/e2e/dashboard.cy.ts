describe('template spec', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn()
    })
  })
  it('passes', () => {
    // cy.intercept(
    //   {
    //     method: 'GET',
    //     url: 'https://api.github.com/orgs/ProgramadoresSemPatria/members/bebossi'
    //   },
    //   {
    //     statusCode: 200,
    //     headers: {
    //       Authorization: `Bearer ${Cypress.env('GITHUB_TOKEN')}`
    //     }
    //   }
    // )
    cy.intercept(
      {
        method: 'GET',
        url: '/dashboard'
      },
      {
        statusCode: 200,
        headers: {
          'content-type': 'text/html',
          __client_uat: '1708261619',
          __clerk_db_jwt:
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJkdmJfMmNYY3hTdUJtTEJQQ0FGM3RXWXdRT2U1d3FXIiwiaWQiOiJjbGllbnRfMmNYY3h2Mk93bTJvOVk1ZU5CbGQ0d3FCUjNQIiwicm90YXRpbmdfdG9rZW4iOiI4azdwZHJjaTI0b3RsdHN3dWNkcWpjanBnM2RnbmI4ZGozMGlqNTVvIn0.nfC2mcr90JexE94ZgTT9nIMJdS-5cg3qfjqDGQ8NgW1apI07Ar9oP_ewp8HvGOrZtczhrekYe3nvTBqq5v56pXV6oCK-42dHacgefYF7k3HtxmArPiLEfmLMjxU2n3RwrTy0K_2V4GfrHUtb93QKixFNKtIqV0rhoKKxOn4XoX-Wt-RnsS0RDlc5Lxq5cgqkvthpvxOxYqennnw0d67qMaiuWJmuq3dstxHzt5ZM3eRUIi2KV-M-6Inerr5VizzQB-_Ik41driglz2yrGPTMEkKo1gjInH5ifHNyJ2scLkk8Meai5eEoiwa_RTS-dhLe6_DPe5FAk5Goa3AWYTT9zw',
          __session:
            'eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18yWmFKTnBieXJQV1JrZmhvZG1JQmk4NjBMMFIiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE3MDgyNjU1NjEsImlhdCI6MTcwODI2NTUwMSwiaXNzIjoiaHR0cHM6Ly9jb2hlcmVudC1hbW9lYmEtMTYuY2xlcmsuYWNjb3VudHMuZGV2IiwibmJmIjoxNzA4MjY1NDkxLCJzaWQiOiJzZXNzXzJjWGN5anZzQWtUVWljNHZaanFQdTVtNHdoVCIsInN1YiI6InVzZXJfMlp1SGk5aVhHT3oxYlJUSDZTMEtXcVJETlFtIn0.a2kuQln2wv_yfEsUPwRDUR3SaZ0PmRjwTeu-cw36gLaD9CwRiRAAltL0AhfbOV0j6XH6CEHbubqwrQY3E_4N3BFKcxS8UaV_j7UzNu89aSYdcUXRxjMF1C4gGxfv3hETSb-G7fHy9PNbLbI1522Dap23Wjc1OpuETtLsVtVRjA9QhjL1zHAGJNby1Leps3kpw0okkM14oAACInugGp0mPCsCv0aV_8dzR3rAYWhuPkMwltrTncdxSBaFIJgKEFq5Vlk51vDEpAxSqqRZ6gMi3jW127UHjoj7waHxszDErROXAdjhC1o9gNAYpMf9uAGu1_5PbNprg8mBo5F18r-4_Q'
        }
      }
    )
    // cy.setCookie(
    //   'user_session',
    //   'HCd186kfsdTKqNj7GbXoOgGzAW_ZdFNWlwGxpN9dQ847daQY'
    // )
    // cy.setCookie('dotcom_user', 'bebossi')
    // cy.setCookie('logged_in', 'yes')
    // cy.setCookie('__client_uat', '1708261619')
    // cy.setCookie(
    //   '_gh_sess',
    //   'zqjztewPrZqyR4NyKA%2BwcuUAsXWA5aSOl03ftGaicCAri3Hqq%2FxNvQ8mSPEi8dKKSqWJYOA7THXUoRfG%2FXfB21H%2BI49YRka%2FXzG4dpU0MgF70qhtBrs%2Bci0iw%2Fx%2BRz9UKtnMQCT4nHEjjET0WyuvIYaDFWZ%2FHjOZj1Y3oL9HPPalUvh%2F4pHYU9hjiU%2FaPtU0paPpJK71o67TzVHE%2BHTH87yQIUIO2b0RS6J6inMOYhW6q7roWufuviBHBc%2BS9YbdlosT34G7pFcIAGyKyWLD%2B2qg8fE1%2F8K3pgBgWGIYjqINAqKQnOtVKXP4lWqGDWJU8jc%2F%2Frb%2Bzz4Y8Rpb53CagRk8%2BSerFFMG8gQYBxMPmsXjOqR%2BFSvM3nGZFwT%2BrCjJpfUUJlpziVJZxLgsyjlr6e2oM%2FeNPDM1jWr2OYJVmQM7KNbO9RSPzRRIo3MmI2EVmzHSib3XEhdB5eaxy0idmZtspD2pmvbPq8ynB6xPGilWq0VctASriuxOaQUAqZrFb9gOPZ%2BP2FTU9oAkRYXjnoCaq3y5J4GVRkTfWMhPAJA7S86xqNWc0Bd2jgc8cjzVGEBc3HhZ8TgE2LpscPLlQ9nGLBOWGMwpMnzuIv8Sm0kAhWohpdd83eyEjX6Xz0VZvL%2B4aC%2B5Kpxy7rOf%2BYLRSv4HtRYQUgv8jyx4I%2FvyvtNcL%2B8wpk0X9I4jpeH0wW1ku6U0DDxjuFbzGxvtiDgAOkpUoXxqgY6OtY4taXehfI5RH2AfmHMzGOgfduHwVSSFJ%2FvooQGzcNDIiCberfSASDAGXS5NEqkZjLEN%2Fw216E0sZT%2BlhmaD8owRyfFv3pqfJiOUlsTaUDrkKFyZbKXpIhxFSpomaua12QEdjSgIkmbhBzOq6nWGBxkNfhnD6qXt3kgw%2BLueWhCZGy%2FhBzxEZTv8vjNR9Ov%2FGhNm%2FCLcO96ciTBV9zotl%2FyPJtiEJ5pVI7DII%2B44QNWBLpa10wROc6n2ALy%2BHVhq%2BK6rorkfQnM%3D--UYlrGCTkwSh6Oa6K--ZUPnjWhkk8Z29s2KMsosKA%3D%3D'
    // )

    cy.visit('/dashboard', {
      failOnStatusCode: false
    })
    // cy.get('h1').contains('Mentorship Program')
  })
})
